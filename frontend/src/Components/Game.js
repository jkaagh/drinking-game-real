import { faAnglesRight, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'


export default function Game(props) {

    const [deck, setDeck] = useState([])
    const [index, setIndex] = useState(0)

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
      
    <div className='h-screen bg-slate-200 flex justify-center items-center flex-col gap-6'>
        <div className='absolute top-5 left-5' onClick={() => {handleGoBack()}}>
            
            <FontAwesomeIcon icon={faArrowTurnDown} className="rotate-90 p-5" />
            
        </div>
        <div className="p-4  text-4xl">
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
        
        <div className='p-4 ' onClick={() => {
            handlePick()
        }}>
            <FontAwesomeIcon icon={faAnglesRight} />
        </div>
    </div>
  )
}
