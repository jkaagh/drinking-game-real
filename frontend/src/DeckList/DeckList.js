import React, {useContext, useState} from 'react'
import DeckCard from './DeckCard';
import Modal from '../Components/Modal';
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CreateDeck from '../Components/Modals/CreateDeck';
import Account from '../Components/Modals/Account';
import { AccountContext } from '../App';



export default function DeckList(props) {
    
    const [showCreateDeck, setShowCreateDeck] = useState(false);
    const [showAccount, setShowAccount] = useState(false)
    const {account, setAccount} = useContext(AccountContext)
    

    const select = (id) => {
        props.select(id)
    }

    const handleDelete = () => {
        console.log("deleted thing")
        props.fetchDecks()
        // setShow(false)
        
    }

   
    return (
        <div className='flex flex-col gap-3 p-4'>
            <div className='flex justify-between gap-2'>
                
                <div className='standardButton' onClick={() => {setShowAccount(true)}}>
                    Account
                </div>

                {
                    account.name !== undefined &&
                    <div className='standardButton' onClick={() => {setShowCreateDeck(true)}}>
                        Create Deck
                    </div>
                }

                <div className='standardButton'>
                    More..
                </div>
                    
              
                

            </div>
            {
                props.decks !== undefined ? props.decks.map((deck, index) => {
                    return (
                        <DeckCard key={index} data={deck} select={select} delete={handleDelete}/>

                    )
                })
                :
                <div className='text-center'>
                    <FontAwesomeIcon icon={faCircleNotch} className="animate-spin"  />
                </div>
            }
            <Modal 
            show={showCreateDeck} 
            setShow={setShowCreateDeck} 
            title={"Create new deck."}
            > 

                <CreateDeck 
                fetchDeck={props.fetchDecks} 
                setShow={setShowCreateDeck}
                fetchDecks={props.fetchDecks}
                />

            </Modal>

            
            <Modal 
            show={showAccount} 
            setShow={setShowAccount} 
            title={"Account Settings."}
            >

                <Account setShowAccount={setShowAccount}/>

            </Modal>
        </div>
    )
}
