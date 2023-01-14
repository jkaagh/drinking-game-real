import axios from 'axios';
import React, { useContext, useState } from 'react'
import { StartGameContext } from '../../App';
import { address } from '../../serverAddress';

export default function DeckSelector({ decks }) {

    const {handleStart} = useContext(StartGameContext)

    const [selectedDecks, setSelectedDecks] = useState([]);

    const handleSelect = (deck) => {
        if (selectedDecks.includes(deck._id)) {
            setSelectedDecks(selectedDecks.filter(d => d !== deck._id));
        } else {
            setSelectedDecks([...selectedDecks, deck._id]);
        }

       
    }


  

    const handleFetchDecks = async () => {
        let allDecks = []
    
        for (const deck of selectedDecks) {
            const response = await axios.get(address + "/card/fetch/" + deck);

            allDecks = allDecks.concat(response.data.data)
        }

        handleStart(allDecks)



    }

    return (
        <div className='flex flex-col gap-4 overflow-scroll' style={{maxHeight: "66vh"}}>
        {
        decks.map((deck, index) => {

            return (
                <div key={index}>                  

                    <div 
                        className={`checkbox ${selectedDecks.includes(deck._id) ? '!bg-purple-500 text-white' : 'unchecked'}`}
                        onClick={() => handleSelect(deck)}>
                        {deck.name}
                    </div>

                </div>
            )
        })
        }

        <div className='standardButton' onClick={handleFetchDecks}>Go</div>
        </div>
    )
}
