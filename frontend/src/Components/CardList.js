import React, {useState, useEffect} from 'react'
import CardInput from './CardInput'
import { Navigate } from "react-router-dom"
import { faAnglesRight, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { address } from '../serverAddress'

export default function CardList(props) {

    const [inputField, setInputField]   = useState("")
    const [deck, setDeck]               = useState([])
    const [redirect, setRedirect] = useState(false)
    
    

    useEffect(() => {
        //fetch cards from server

        handleFetchCards()

    }, [])
    
    useEffect(() => {
        document.getElementById("scrollDiv").scrollTop = document.getElementById("scrollDiv").scrollHeight

      
    }, [deck])
    
    //fetches cards and renders list
    const handleFetchCards = () => {
       
        
        axios.get(address + "/card/fetch/"+ localStorage.getItem("selectedDeck"))
        .then((response) => {
            // console.log(response.data.data)
          
            // console.log(deck)
            setDeck(response.data.data)
        })

        
    }



    const handleSubmit = () => {
        
        axios.post(address + "/card/create/", {prompt:inputField, id:localStorage.getItem("selectedDeck")})
        .then((response) => {
            if(response.data.success == false){
                alert("Error, card not added.")
                return
            }
            handleFetchCards()
            
        })

        
        
    }

    const handleDelete = (id) => {

        console.log(id)
        
        axios.delete(address + "/card/delete/" + id)
        .then((response) => {
            if(response.data.success == false){
                alert("Error, card not deleted.")
                return
            }
            handleFetchCards()
        })
      
    }

    const handleStart = () => {

        //generate and shuffle deck
        let ShuffledDeck = []
        deck.forEach(card => {
            ShuffledDeck.push(card.prompt)
        });
        ShuffledDeck.sort(() => Math.random() - 0.5)
        
        //handle localstorage
        localStorage.setItem("ingame", true)
        localStorage.setItem("ShuffledDeck", JSON.stringify(ShuffledDeck))
        localStorage.setItem("CardIndex", 0)

        props.toGame()
        return

        localStorage.setItem("CardIndex", 0)
        localStorage.setItem("ShuffledDeck", null)
        let ShuffledDecsk = [...deck].sort(() => Math.random() - 0.5)
        console.log(ShuffledDeck)
        localStorage.setItem("ShuffledDeck", JSON.stringify(ShuffledDeck))
        setRedirect(true)

    }

  return (
    <div className=' customHeight' >
        <div className=' shadow-md h-5/6  flex flex-col gap-2 p-2 overflow-scroll mt-4 ' id="scrollDiv">

            {
                deck.map((card, index) => {
                    console.log()
                    return(
                        <div key={index}>
                            {/* eventually just replace id with server object id */}
                            <CardInput  data={card} handleDelete={handleDelete}/>
                            
                        </div>
                            
                        
                    )
                })
            }
            <input className='standardInput shadow-md bg-slate-100 mb-8'
            placeholder='Add new card' 
            onChange={(e) => {
                setInputField(e.target.value)
            }}
            onKeyDown={(e) => {
                if(e.keyCode === 13){
                    handleSubmit()
                    e.target.value = ""
                    
                }
            }}
            />

            
        </div>
        <div className='flex justify-center items-center relative bg-pink-300' >
            <div className='p-2 bg-white absolute -top-4 w-full gradient'></div>
            <div className='absolute  left-4 bg-lime-300' onClick={() => {props.back()}}>
                <FontAwesomeIcon icon={faArrowTurnDown} className="rotate-90 p-5"  />
            </div>
            <div className='p-5 text-4xl' onClick={handleStart}>
                Go!
            </div>
            {
                redirect &&
                <Navigate replace to="/play/"/>
            }
        </div>
    </div>
  )
}
