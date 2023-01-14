import { faAnglesRight, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import { UpdatePlayerlist } from '../methods/generateCards'
import Modal from './Modal'
import PlayerList from './Modals/PlayerList'


export default function Game(props) {

    console.log("this ran")

    const [deck, setDeck] = useState([])
    const [index, setIndex] = useState(0)
    const [showPlayerList, setShowPlayerList] = useState(false)


    useEffect(() => {
      //runs every refresh to go back where we left off.

      setDeck(JSON.parse(localStorage.getItem("ShuffledDeck")))
      setIndex(parseInt(localStorage.getItem("CardIndex")))

      

      
    }, [])

    const handlePick = () => {
        
        // console.log(index, deck)

        if(index > deck.length){
            console.log("finished!")
        }

        localStorage.setItem("CardIndex", index+1)
        setIndex(index => index+1)
        
    }

    //eventually make modal prompt here.
    const handleGoBack = () => {
        localStorage.removeItem("ingame") //will no longer boot app to game
        props.toCardList()

    }

  return (
      
    <div className='h-screen bg-slate-200 flex justify-between items-center flex-col gap-6'>
        
        
        <div className='flex w-screen p-2 items-center justify-between' >
            
            <div onClick={() => {handleGoBack()}}>
                <FontAwesomeIcon icon={faArrowTurnDown} className="rotate-90 p-5" />
            </div>      
            
            <div className='standardButton' onClick={() => { setShowPlayerList(true) }}>
                Edit players
            </div>
            
        </div>


        <div className="p-4  text-4xl text-center">
        {
            index < deck.length ?
            <div>
                {deck[index]}
            </div>
            :
            <div>
                Thats all folks!
            </div>
        }
        </div>
        
        <div style={{height: "35vh"}} className='w-full p-5 shadow-lg  rounded deckCardBackground flex justify-center items-center' onClick={() => {
            handlePick()
        }}>
            
            <span className='text-4xl'>

            <FontAwesomeIcon icon={faAnglesRight} />
            </span>

           
        </div>





        <Modal
        show={showPlayerList}
        setShow={setShowPlayerList}
        title={"Player list"}
        >
            <p className='italic text-center'>Edit players and keep your progress in the game.</p>
            <PlayerList />
            <div className='standardButton' onClick={() => {
                const newDeck = UpdatePlayerlist()
                localStorage.setItem("ShuffledDeck", JSON.stringify(newDeck))
                setDeck(newDeck)
                setShowPlayerList(false)
            }}>Confirm</div>    
        </Modal>
    </div>
  )
}
