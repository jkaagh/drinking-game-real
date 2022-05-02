import axios from 'axios'
import React, {useState} from 'react'
import Modal from '../Components/Modal'
import { address } from '../serverAddress'

export default function DeckCard(props) {

    const [show, setShow] = useState(false)

    const handleDelete = () => {
        axios.delete(address + "/deck/delete/" + props.data._id)
        .then((response) => {
            console.log(response.data)
        })
    }

    return (
        <div className="p-5 shadow-lg border-b-2 border-purple-500 flex justify-between" >
            <div className='bg-pink-500 w-10/12' onClick={() => { props.select(props.data._id) }}>
                <p className='font-bold'>{props.data.name}</p>
                <p>made by {props.data.creator}</p>
                <p>{props.data.cardAmount} cards.</p>
            </div>
            <div className='bg-lime-500 relative' onClick={() => {setShow(true)}}>
                menu
               
            </div>
            <Modal show={show}>
                <div className='flex flex-row-reverse'>
                    <div className='p-2 font-bold' onClick={() => {setShow(false)}}>
                        X   
                    </div>
                </div>
                <div>
                    <div className='standardButton' onClick={handleDelete}>
                        Delete Deck
                    </div>
                </div>
            </Modal>
        </div>
    )
}
