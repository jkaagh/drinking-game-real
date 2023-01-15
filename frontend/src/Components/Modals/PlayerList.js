import React, { useState, useEffect } from 'react';

export default function PlayerList() {

    const [players, setPlayers] = 
    useState(JSON.parse(localStorage.getItem("playerList")) || []);                                                 

    useEffect(() => {
        // check local storage for existing list
        const playerList = JSON.parse(localStorage.getItem("playerList"));
        console.log(playerList)
        if (playerList) {
        setPlayers(playerList);
        }
    }, []);

    useEffect(() => {
        // update local storage with current player list
        localStorage.setItem("playerList", JSON.stringify(players));
        console.log(players)
    }, [players]);

    const handlePlayerChange = (e, index) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = e.target.value;
        setPlayers(updatedPlayers);
    };

    const handlePlayerDelete = (index) => {
        const updatedPlayers = [...players];
        updatedPlayers.splice(index, 1);
        setPlayers(updatedPlayers);
    };

    const [newPlayer, setNewPlayer] = useState("");

    const handleNewPlayerChange = (e) => {
        setNewPlayer(e.target.value);
    };

    const handleNewPlayerSubmit = (e) => {
        if (e.key === "Enter" || e.type === "click") {
        setPlayers([...players, newPlayer]);
        setNewPlayer("");
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            {players.map((player, index) => (
                <div key={index} className="cardListBox flex justify-between">
                    <input
                        className='py-3 px-4 w-4/5 outline-none '
                        type="text"
                        value={player}
                        onChange={(e) => handlePlayerChange(e, index)}
                    />
                    <button className='text-red-600 font-bold p-3' onClick={() => handlePlayerDelete(index)}>X</button>
                </div>
            ))}
            <div>
                <input
                placeholder='Add player'
                type="text"
                value={newPlayer}
                onChange={handleNewPlayerChange}
                // onKeyPress={handleNewPlayerSubmit}
                onFocus={(e) => {
                    e.target.onkeydown = (e) => {
                        if (e.code === "Enter" || e.key === "Enter") {
                            handleNewPlayerSubmit();
                        }
                    }
                }}
                className="standardInput shadow-md bg-slate-100 mb-8 w-full"
                />
                {/* <button onClick={handleNewPlayerSubmit}>Add</button> */}
            </div>
        </div>
    );
}














//prompt for chat gpt

// import React from 'react'

// export default function PlayerList() {

    

//     //useEffect to check localstorage for existing list

//     //store PlayerList in usestate

//   return (
//     <div>

//         //render out list of players, each as an input field. Changing this inputfield updates the usestate and the localstorage.
//         //button for deleting player from useState and localstorage to the right of the name.

//         //at the bottom there is an input and confirm-button for adding players to useState and localstorage.
//         //if i'm on phone and press the "Go" button it confirms.
//         //same if i press enter on keyboard.
//         //confirming and submitting to the list clears the inputfield.


//     </div>
//   )
// }
