import axios from 'axios'
import React, {useState} from 'react'
import Modal from '../Components/Modal'
import { address } from '../serverAddress'
import { faEllipsisV, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DeckCard(props) {

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log(props.account)
    const handleDelete = () => {
        setLoading(true)
        axios.delete(address + "/deck/delete/" + props.data._id + "/" + props.account.password)
        .then((response) => {
            console.log(response.data)
            props.delete()
            setLoading(false)
        })
    }

    return (
        <div className="p-5 shadow-lg border-b-2 border-purple-500 flex justify-between rounded  deckCardBackground">
            <div className=' w-10/12' onClick={() => { props.select(props.data._id) }}>
                <p className='text-xl'>{props.data.name}</p>
                <p>made by {props.data.creator}</p>
                <p>{props.data.cardAmount} cards.</p>
            </div>
            {
                props.account &&

                <div className=' relative' onClick={() => {setShow(true)}}>
                    <FontAwesomeIcon icon={faEllipsisV} className=""  />
                </div>
                
            }
            
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
                        {
                            loading === false ?
                                <div className='standardButton' onClick={handleDelete}>
                                    Delete Deck            
                                </div>
                          
                                :

                                <>
                                    <div className='text-center'>
                                        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin"  />
                                    </div>
                                </>
                          
                        }   
                       
                    </div>
                        
                }

            </Modal>
        </div>
    )
}
