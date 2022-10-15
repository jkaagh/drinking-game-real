import React, {useState, useEffect} from 'react'
import Modal2 from './Modal2'


export default function PlayerList() {

    const [playerList, setPlayerList]   = useState([])
    const [input, setInput]             = useState("")

    useEffect(() => {
        //eventually fetch from useState.

        setPlayerList(JSON.parse(localStorage.getItem("PlayerList")))

    }, [])
    


    const [openPlayers, setOpenPlayers] = useState(false)

    const handleOpenList = () => {
        setOpenPlayers(true)
    }

    const handleCloseList = () => {
        setOpenPlayers(false)
    }

    const handleAddPlayer = () => {
        
        setPlayerList(playerList => [...playerList, input])

        //check if localstorage thing exists, if not create one.
        if(localStorage.getItem("PlayerList") === null) {
            localStorage.setItem("PlayerList", JSON.stringify([input]))
            return
        }

        //otherwise add input to array:

        let list = JSON.parse(localStorage.getItem("PlayerList"))

        list.push(input)

        localStorage.setItem("PlayerList", JSON.stringify(list))
          
    }

    const handleDeletePlayer = (index) => {

        let list = JSON.parse(localStorage.getItem("PlayerList"))

        list.splice(index, 1)

        
        localStorage.setItem("PlayerList", JSON.stringify(list))
        setPlayerList(list)
    }



    return (
        <>
            <Modal2 open={openPlayers} closeFunction={handleCloseList}>
                {
                    playerList !== null ? playerList.map((player, index) => {

                        return (
                            <div className='mb-4 border-b-2 flex justify-between items-center p-2'>
                                <div>
                                    {player}
                                </div>
                                <div className='deleteButton' onClick={() => {handleDeletePlayer(index)}}>
                                    X
                                </div>
                            </div>
                        )
                        
                      
                    })
                    : null
                }

                <div className='flex items-center gap-4'>
                    <input className='standardInput !m-0' placeholder='Add player' value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                    }} />
                    <div className='standardButton'
                    onClick={() => {
                        handleAddPlayer()
                        setInput("")
                    }}>
                        Add
                    </div>
                </div>
            </Modal2>
            <div className='flex justify-between gap-2 m-2'>
                <div className='standardButton' onClick={handleOpenList}>
                    Players
                </div>
            </div>
        </>
    )
}
