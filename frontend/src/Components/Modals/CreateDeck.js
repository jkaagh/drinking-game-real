import React, {useContext, useState} from 'react'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import {address} from "../../serverAddress"
import { AccountContext } from '../../App'

export default function CreateDeck(props) {

    
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("")
    const [show, setShow] = useState(false);
    const {account, setAccount} = useContext(AccountContext)

    const handleCreateDeck = () => {
        setLoading(true)
        axios.post(address + "/deck/create/", {name: input, password: account.password})
        .then((response) => {
            if(response.data.success === false){
                alert(response.data.msg)
            }
            setLoading(false)
            props.fetchDecks()  
            
        })  
        
        props.setShow(false)
    }

    return (
        <div>


            {/* <div className='flex flex-row-reverse'>
                <div className='p-2 font-bold' onClick={() => { props.setShow(false) }}>
                    X
                </div>
            </div> */}
            <div>
                {
                    loading === false ?
                        <>

                            <p>Deck name:</p>
                            <input className='standardInput' onChange={(e) => { setInput(e.target.value) }} />


                            <div className='standardButton' onClick={() => { handleCreateDeck() }}>
                                Confirm
                            </div>
                        </>

                        :

                        <>
                            <div className='text-center'>
                                <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
                            </div>
                        </>
                }

            </div>


        </div>
    )
}
