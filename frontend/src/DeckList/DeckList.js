import React, {useState} from 'react'
import axios from "axios"
import {address} from "../serverAddress"
import DeckCard from './DeckCard';
import Modal from '../Components/Modal';


export default function DeckList(props) {
    
    const [show, setShow] = useState(false);
    const [input, setInput] = useState("")
    const [creator, setCreator] = useState("")



    const handleCreateDeck = () => {
        axios.post(address + "/deck/create/", {name: input, creator: creator})
        .then((response) => {
            if(response.data.success == false){
                alert("Error. Deck not created.")
            }
            props.fetchDecks()
            setShow(false)
        })          
    }

    const select = (id) => {
        props.select(id)
    }
    return (
        <div className='flex flex-col gap-3 p-4'>
            <div className='flex  gap-2'>
                <div className='standardButton' onClick={() => {setShow(true)}}>
                    Create Deck
                </div>

            </div>
            {
                props.decks && props.decks.map((deck, index) => {
                    return (
                        <DeckCard key={index} data={deck} select={select}/>
                        // <div key={index} className="p-5 shadow-lg border-b-2 border-purple-500 flex justify-between" >                            
                        //     <div className='bg-pink-500 w-10/12' onClick={() => {props.select(deck._id)}}>
                        //         <p>{deck.name}</p>
                        //         <p>made by {deck.creator}</p>
                        //         <p>{deck.cardAmount} cards.</p>
                        //     </div>
                        //     <div className='bg-lime-500 relative'>
                        //         menu    
                        //         <div className='p-8 absolute bg-black right-0'>

                        //         </div>
                        //     </div>
                        // </div>
                    )
                })
            }
                <Modal show={show}>
                <div className='flex flex-row-reverse'>
                    <div className='p-2 font-bold' onClick={() => {setShow(false)}}>
                        X   
                    </div>
                </div>
                <div>
                    <p>Deck name:</p>
                    <input className='standardInput' onChange={(e) => {setInput(e.target.value)}}/>
                    <p>Creator name:</p>
                    <input className='standardInput' onChange={(e) => {setCreator(e.target.value)}}/>

                    <div className='standardButton' onClick={()  => {handleCreateDeck()}}>
                        Confirm
                    </div>
                </div>
            </Modal>
        </div>
    )
}
