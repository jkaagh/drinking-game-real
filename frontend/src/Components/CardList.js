import React, {useState, useEffect} from 'react'
import CardInput from './CardInput'

import {faArrowTurnDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { address } from '../serverAddress'
import Modal2 from './Modal2'
import PlayerList from './PlayerList'
import GenerateDeck from './GenerateDeck'

export default function CardList(props) {

    const [inputField, setInputField]   = useState("")
    const [deck, setDeck]               = useState(undefined)
    const [redirect, setRedirect] = useState(false)
    const [canEdit, setCanEdit] = useState(false)
    
    
    

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
            if(response.data.creator == localStorage.getItem("username")){
                setCanEdit(true)
            }
        })

        
    }



    const handleSubmit = () => {



        axios.post(address + "/card/create/", {prompt:inputField, password: props.account.password, id:localStorage.getItem("selectedDeck")})
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
        
        axios.delete(address + "/card/delete/" + id + "/" + props.account.password)
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
        let ShuffledDeck = GenerateDeck(deck)

        return
        //legacy bullshit
        // deck.forEach(card => {
        //     ShuffledDeck.push(card.prompt)
        // });
        // ShuffledDeck.sort(() => Math.random() - 0.5)
        
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



    ///////

  return (
    <div className=' customHeight' >

        <PlayerList/>

        <div className=' shadow-md h-5/6  flex flex-col gap-2 p-2 overflow-scroll mt-4 ' id="scrollDiv">

            {
                deck !== undefined ? deck.map((card, index) => {
                    
                    return(
                        <div key={index}>
                            {/* eventually just replace id with server object id */}
                            <CardInput canEdit={canEdit} account={props.account} data={card} handleDelete={handleDelete}/>
                            
                        </div>
                            
                        
                    )
                })

                :

                <div className='text-center'>
                    <FontAwesomeIcon icon={faCircleNotch} className="animate-spin"  />
                </div>


            }

            {/* Input field. Show if allowed */}
            {
                canEdit &&
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
            }

            
        </div>
        <div className='flex justify-center items-center relative ' >
            <div className='p-2 bg-white absolute -top-4 w-full gradient'></div>
            <div className='absolute  left-4 ' onClick={() => {props.back()}}>
                <FontAwesomeIcon icon={faArrowTurnDown} className="rotate-90 p-5"  />
            </div>
            <div className='p-5 text-4xl' onClick={handleStart}>
                Go!
            </div>

        </div>
    </div>
  )
}
