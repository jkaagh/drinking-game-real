import React, {useState, useEffect} from 'react'
import CardInput from './CardInput'
import { Navigate } from "react-router-dom"

export default function CardList() {

    const [inputField, setInputField]   = useState("")
    const [deck, setDeck]               = useState([])
    const [redirect, setRedirect] = useState(false)
    
    

    useEffect(() => {
        //check for existing list in localstorage and add to memory.
        //later on fetch from server.
        let list = localStorage.getItem("Deck")

        if(list === null){
            setDeck([])
        }
        else{
            setDeck(JSON.parse(list))
        }

    }, [])
    
    useEffect(() => {
        document.getElementById("scrollDiv").scrollTop = document.getElementById("scrollDiv").scrollHeight

        console.log(plus(2))
    }, [deck])
    




    function plus(tal){
        return tal*2
    }


















    const handleSubmit = () => {
        //add input field to list in memory
        setDeck(deck => [...deck, inputField])
        
        console.log([...deck, inputField])
        
        //set to localstorage
        localStorage.setItem("Deck", JSON.stringify([...deck, inputField]))
        
    }

    const handleDelete = (id) => {
        //does server delete request.

        //removes specific card from memory deck when deleted from server.
        console.log(deck)
        let newDeck
        deck.forEach(card => {
            //eventually find id in here and remove from array. for now just remove at index.
        });
       
        console.log(id)
        newDeck = [...deck];
        newDeck.splice(id, 1)
        
        console.log(newDeck)

        //save to localstorage
        localStorage.setItem("Deck", JSON.stringify(newDeck))
        
        

        //retarded workaround for a retarded framework
        // setDeck(newDeck) //this would not be commented unless this stupid bug kept happening.
        window.location.reload()

        
    }

    const handleStart = () => {
        localStorage.setItem("CardIndex", 0)
        localStorage.setItem("ShuffledDeck", null)
        let ShuffledDeck = [...deck].sort(() => Math.random() - 0.5)
        console.log(ShuffledDeck)
        localStorage.setItem("ShuffledDeck", JSON.stringify(ShuffledDeck))
        setRedirect(true)
        


    }

  return (
    <div className=' customHeight' >
        <div className=' shadow-md h-5/6  flex flex-col gap-2 p-2 overflow-scroll mt-4 ' id="scrollDiv">
            {
                deck.map((card, index) => {
                    return(
                        <>
                            {/* eventually just replace id with server object id */}
                            <CardInput key={index} value={card} id={index} handleDelete={handleDelete}/>
                            
                        </>
                            
                        
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
        <div className='flex justify-center items-center relative' >
            <div className='p-2 bg-white absolute -top-4 w-full gradient'></div>
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
