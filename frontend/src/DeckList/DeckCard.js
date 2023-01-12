import axios from 'axios'
import React, {useContext, useState} from 'react'
import Modal from '../Components/Modal'
import { address } from '../serverAddress'
import { faEllipsisV, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AccountContext } from '../App'

export default function DeckCard(props) {

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const {account, setAccount} = useContext(AccountContext)


    const handleDelete = () => {
        setLoading(true)
        axios.delete(address + "/deck/delete/" + props.data._id + "/" + account.password)
        .then((response) => {
            console.log(response.data)
            props.delete()
            setLoading(false)
        })
        setShow(false)
    }

    return (
        <div className="p-5 shadow-lg border-b-2 border-purple-500 flex justify-between rounded  deckCardBackground">
            <div className=' w-10/12' onClick={() => { props.select(props.data._id) }}>
                <p className='text-xl'>{props.data.name}</p>
                <p>made by {props.data.creator}</p>
                <p>{props.data.cardAmount} cards.</p>
            </div>
            {
                account.name &&

                <div className=' relative' onClick={() => {setShow(true)}}>
                    <FontAwesomeIcon icon={faEllipsisV} className="p-3"  />
                </div>
                
            }
            
            <Modal show={show} setShow={setShow} title={props.data.name}>
               
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
