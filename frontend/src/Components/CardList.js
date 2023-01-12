import React, { useState, useEffect, useRef, useContext } from 'react'
import CardInput from './CardInput'

import { faArrowTurnDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { address } from '../serverAddress'
import generateCards from '../methods/generateCards'
import Modal from './Modal'
import PlayerList from './Modals/PlayerList'
import { AccountContext } from '../App'

export default function CardList(props) {

    const [inputField, setInputField] = useState("")
    const [deck, setDeck] = useState(undefined)
    const [redirect, setRedirect] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    const [showPlayerList, setShowPlayerList] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false)
    const { account, setAccount } = useContext(AccountContext)


    useEffect(() => {
        //fetch cards from server

        handleFetchCards()

    }, [])

    useEffect(() => {
        document.getElementById("scrollDiv").scrollTop = document.getElementById("scrollDiv").scrollHeight


    }, [deck])

    //fetches cards and renders list
    const handleFetchCards = () => {
        axios.get(address + "/card/fetch/" + localStorage.getItem("selectedDeck"))
            .then((response) => {
                // console.log(response.data.data)

                // console.log(deck)

                setDeck(response.data.data)
                if (response.data.creator == localStorage.getItem("username")) {
                    setCanEdit(true)
                }
            })


    }



    const handleSubmit = () => {
        axios.post(address + "/card/create/", { prompt: inputField, password: props.account.password, id: localStorage.getItem("selectedDeck") })
            .then((response) => {
                if (response.data.success == false) {
                    alert("Error, card not added.")
                    return
                }
            handleFetchCards()
        })
    }

    const handleDelete = (id) => {
        axios.delete(address + "/card/delete/" + id + "/" + props.account.password)
            .then((response) => {
                if (response.data.success == false) {
                    alert("Error, card not deleted.")
                    return
                }
                handleFetchCards()
            })
    }

    const handleUpdate = (id, update) => {
        console.log(id, update)
        axios.patch(address + "/card/update/" + id, { update: update, password: account.password })
            .then((response) => {
                if (response.data.success == false) {
                    alert("Error, card couldn't be updated.")
                    return
                }
            })
    }

    const handleStart = () => {


        // let cards = [];
        // for (let i = 0; i < 200; i++) {
        //   cards.push({
        //     prompt: `card ${i} {p1}`,
        //     options: {
        //       duplicates: 1
        //     }
        //   });
        // }

        let cards = [
            {
                prompt: "Alle Drikker",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} kysser {p2}",
                options: {
                    dupes: 0,
                }
            },
            {
                prompt: "{p1} skal sutte {p2}'s finger. Hvis {p1} ikke gør det må {p2} slå ham.",
                options: {
                    dupes: 0,
                }
            }

        ]


        let names = [
            "player 1",
            "player 2",
            "player 3",
            "player 4",
            "player 5",
            "player 6",
            "player 7",
            "player 8",
        ]

        console.log(deck)
        let FinishedDeck = generateCards(deck, names)



        //handle localstorage
        localStorage.setItem("ingame", true)
        localStorage.setItem("ShuffledDeck", JSON.stringify(FinishedDeck))
        localStorage.setItem("CardIndex", 0)

        props.toGame()
        return

        // localStorage.setItem("CardIndex", 0)
        // localStorage.setItem("ShuffledDeck", null)
        // let ShuffledDecsk = [...deck].sort(() => Math.random() - 0.5)
        // console.log(ShuffledDeck)
        // localStorage.setItem("ShuffledDeck", JSON.stringify(ShuffledDeck))
        // setRedirect(true)

    }


    const inputRef = useRef(null)

    const handlePButton = (p, inputField, setInputField) => {
        const input = inputRef.current;
        const caretPos = input.selectionStart;
        const updatedInputField = inputField.slice(0, caretPos) + " {p" + p + "} " + inputField.slice(caretPos);

        setInputField(updatedInputField);
        inputRef.current.value = updatedInputField
        input.selectionStart = caretPos + 6;
        input.selectionEnd = caretPos + 6;
        input.focus();
        console.log("it ran");
    };





    return (
        <div className=' customHeight' >

            <div className='standardButton' onClick={() => { setShowPlayerList(true) }}>
                Players
            </div>

            <Modal
                show={showPlayerList}
                setShow={setShowPlayerList}
                title={"Player list"}
            >

                <PlayerList />

            </Modal>

            <div className=' shadow-md h-5/6  flex flex-col gap-2 p-2 overflow-scroll mt-4 ' id="scrollDiv">

                {
                    deck !== undefined ? deck.map((card, index) => {
                        return <CardInput key={index} canEdit={canEdit} account={props.account} data={card} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                    })

                        :

                        <div className='text-center'>
                            <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
                        </div>


                }

                {/* Input field. Show if allowed */}
                {
                    canEdit &&
                    <>
                        <input
                            ref={inputRef}
                            className='standardInput shadow-md bg-slate-100 !mb-2 '
                            placeholder='Add new card'
                            onChange={(e) => {
                                setInputField(e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    handleSubmit()
                                    e.target.value = ""

                                }
                            }}

                        />


                        <div className='mb-8'>
                            Random players:
                            <span className='font-bold px-2 py-1 rounded-full m-2 bg-slate-200' onClick={() => { setShowInfoModal(true) }}>?</span>
                            <div className='flex gap-3 mt-3'>

                                <button className='standardButton bloc' onClick={() => { handlePButton(1, inputField, setInputField) }}>p1</button>
                                <button className='standardButton bloc' onClick={() => { handlePButton(2, inputField, setInputField) }}>p2</button>
                                <button className='standardButton bloc' onClick={() => { handlePButton(3, inputField, setInputField) }}>p3</button>
                                <button className='standardButton bloc' onClick={() => { handlePButton(4, inputField, setInputField) }}>p4</button>
                                <button className='standardButton bloc' onClick={() => { handlePButton(5, inputField, setInputField) }}>p5</button>

                            </div>
                        </div>
                    </>
                }


            </div>
            <div className='flex justify-center items-center relative ' >
                <div className='p-2 bg-white absolute -top-4 w-full gradient'></div>
                <div className='absolute  left-4 ' onClick={() => { props.back() }}>
                    <FontAwesomeIcon icon={faArrowTurnDown} className="rotate-90 p-5" />
                </div>
                <div className='p-5 text-4xl' onClick={handleStart}>
                    Go!
                </div>

            </div>

            <Modal
                show={showInfoModal}
                setShow={setShowInfoModal}
                title={"Random players"}
            >


                <p className=' italic mb-2'>
                    The algorithm works so players are picked randomly, but equally as often as eachother on average.
                </p>
                <p>
                    Use these buttons to tell the app where player names are randomly used.
                </p>
                <p>For example:</p>
                <p className='p-3'>
                    &#123;p1&#125; cannot come up with a good example, so &#123;p2&#125; suggests writing this dumb shit. &#123;p1&#125; is now happy.
                </p>
                <p>Turns into:</p>
                <p className='p-3'>
                    Johannes cannot come up with a good example, so Magnus suggests writing this dumb shit. Johannes is now happy.
                </p>
                <br></br>
                <p className='font-bold'>
                    Note:
                </p>

                <p className='mb-3'>
                    The &#123;p <span className='font-mono'>number</span>&#125; gives a random player every card, and only for referencing the same player twice, like above.

                </p>
                <p className='mb-3'>
                    If you have more &#123;p&#125;'s than players it will work fine, but pick players already used.
                </p>
                <p>
                    You can have up to  &#123;p50&#125; and 50 players.
                </p>


            </Modal>

        </div>
    )
}
