import axios from 'axios'
import React, {useState} from 'react'
import Modal from '../Components/Modal'
import { address } from '../serverAddress'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DeckCard(props) {

    const [show, setShow] = useState(false)
    
    const handleDelete = () => {
        axios.delete(address + "/deck/delete/" + props.data._id + "/" + props.account.password)
        .then((response) => {
            console.log(response.data)
            
        })
    }

    return (
        <div className="p-5 shadow-lg border-b-2 border-purple-500 flex justify-between rounded bg-slate-100" >
            <div className=' w-10/12' onClick={() => { props.select(props.data._id) }}>
                <p className='text-xl'>{props.data.name}</p>
                <p>made by {props.data.creator}</p>
                <p>{props.data.cardAmount} cards.</p>
            </div>
            <div className=' relative' onClick={() => {setShow(true)}}>
            <FontAwesomeIcon icon={faEllipsisV} className=""  />
               
            </div>
            <Modal show={show}>
               


                <div className='flex justify-between'>
                    <div className=''>
                        <p className='text-xl'>{props.data.name}</p>
                    </div>
                    <div className='p-2 font-bold' onClick={() => {setShow(false)}}>
                        X   
                    </div>
                </div>
                {
                    localStorage.getItem("username") == props.data.creator &&
                    <div>
                        <div className='standardButton' onClick={handleDelete}>
                            Delete Deck
                        </div>
                    </div>

                }

            </Modal>
        </div>
    )
}
