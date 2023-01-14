import React, {useContext, useState} from 'react'
import DeckCard from './DeckCard';
import Modal from '../Components/Modal';
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CreateDeck from '../Components/Modals/CreateDeck';
import Account from '../Components/Modals/Account';
import { AccountContext } from '../App';
import PlayerList from '../Components/Modals/PlayerList';
import DeckSelector from '../Components/Modals/DeckSelector';



export default function DeckList(props) {
    
    const [showCreateDeck, setShowCreateDeck] = useState(false);
    const [showAccount, setShowAccount] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState(<div></div>)
    const [modalTitle, setModalTitle] = useState("")

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
                <div className='standardButton' onClick={() => {setShowMenu(true)}}>
                    Menu
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

                <CreateDeck fetchDeck={props.fetchDecks} setShow={setShowCreateDeck} fetchDecks={props.fetchDecks}/>

            </Modal>

            
            <Modal 
            show={showAccount} 
            setShow={setShowAccount} 
            title={"Account Settings."}
            >

                <Account setShowAccount={setShowAccount}/>

            </Modal>

            <Modal
            show={showMenu}
            setShow={setShowMenu}
            title={"Menu"}
            >
                <div className='flex flex-col gap-5'>

                    {/* player list */}
                    <div className='standardButton'
                    onClick={() => {
                        setModalContent(<PlayerList/>)
                        setModalTitle("Player list")
                        setShowModal(true)
                        setShowMenu(false)
                    }}>
                        Player List
                    </div>

                    {/* Select Multiple Decks */}
                    <div className='standardButton'
                    onClick={() => {
                        setModalContent(<DeckSelector decks={props.decks}/>)
                        setModalTitle("Select Multiple Decks")
                        setShowModal(true)
                        setShowMenu(false)
                    }}>
                        Select Multiple Decks.
                    </div>

                    {/* account */}
                    <div className='standardButton'
                    onClick={() => {
                    setModalContent(<Account setShowAccount={setShowModal}/>)
                    setModalTitle("Account")
                    setShowMenu(false)
                    setShowModal(true)
                    }}>
                        Account
                    </div>

                    {
                    account.name !== undefined &&
                    <div className='standardButton'
                    onClick={() => {
                    setModalContent(<CreateDeck fetchDeck={props.fetchDecks} setShow={setShowModal} fetchDecks={props.fetchDecks}/>)
                    setModalTitle("Create Deck")
                    setShowMenu(false)
                    setShowModal(true)
                    }}>
                        Create Deck
                    </div>
                    }


                  
                </div>

            </Modal>

            <Modal
            show={showModal}
            setShow={setShowModal}
            title={modalTitle}
            >
            
            {modalContent}

            </Modal>
        </div>
    )
}
