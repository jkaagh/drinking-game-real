import React, {useState, useEffect, useContext} from "react";
import axios from "axios"
import CardList from "./Components/CardList";
import Game from "./Components/Game";
import DeckList from "./DeckList/DeckList";
import serverAdress, { address } from "./serverAddress"
import generateCards from "./methods/generateCards";


const AccountContext = React.createContext({})
const StartGameContext = React.createContext({})

function App() {


    const [account, setAccount] = useState(
        {
            admin: undefined,
            name: undefined,
            password: undefined
        }
    )
    

    const [page, setPage] = useState("")

    //holds list of decks. this is fetched on app boot and when click refresh button or when go to decklist page
    const [deckList, setDeckList] = useState(undefined)

    //on app boot
    useEffect(() => {
        
        console.log(address)

        switch(localStorage.getItem("CurrentPage")){
            case "Game":
            toGame();
            break;

            case "DeckList":
            handleGoBack();
            break;

            case "CardList":
            toCardList();
            break;

            default:
            handleGoBack();
            }
    }, [])
    

    //selects a deck and goes to CardList screen
    const handleSelect = (id) => {
        localStorage.setItem("selectedDeck", id)
        toCardList()
        
    }

    //sets page to DeckList.js note to self: make 1 function to set page to this, and reuse everywhere.
    const handleGoBack = () =>{
        setPage("DeckList")
        localStorage.setItem("CurrentPage", "DeckList")
        console.log("asdf")
        handleFetchDecks()
       
    }

    const handleFetchDecks = () => {
        console.log("asdasdas")
        axios.get(serverAdress.address + "/deck/fetch")
        .then((response) => {
           
            if(response.data.success){
                setDeckList(response.data.data)
                console.log(response.data.data)
            }
        })
    }

    const toGame = () => {
        setPage("Game")
        localStorage.setItem("CurrentPage", "Game")
    }

    const handleStart = (deck, cont) => {

        
        if(cont){
            setPage("Game")
            localStorage.setItem("CurrentPage", "Game")
            return
        }

        let FinishedDeck = generateCards(deck)

        //handle localstorage
        localStorage.setItem("ingame", true)
        localStorage.setItem("ShuffledDeck", JSON.stringify(FinishedDeck))
        localStorage.setItem("CardIndex", 0)

        setPage("Game")
        localStorage.setItem("CurrentPage", "Game")
    }
   
    const toCardList = () => {
        setPage("CardList")
        localStorage.setItem("CurrentPage", "CardList")

    }

    const handleLogin = (password) => {
        console.log(password)
        axios.get(address + "/account/login/" + password)
        .then((response) => {
            alert(response.data.msg)
            console.log(response.data)
            if(response.data.success){
                localStorage.setItem("isAdmin", response.data.data.admin)
                localStorage.setItem("username", response.data.data.name)
                localStorage.setItem("password", response.data.data.password)

                setAccount({
                    admin: response.data.data.admin.toString(),
                    name: response.data.data.name,
                    password: response.data.data.password
                 })
            }
        })
    }

    //check if logged in on boot
    useEffect(() => {
       
        if(localStorage.getItem("username") == null) return
         //if logged in:

         //set account state to this, sent to all components.
         setAccount({
            admin: localStorage.getItem("isAdmin"),
            name: localStorage.getItem("username"),
            password: localStorage.getItem("password")
         })


  
    }, [])

    // const handleLogout = () => {
    //     setAccount(undefined)
    //     localStorage.removeItem("isAdmin")
    //     localStorage.removeItem("username")
    //     localStorage.removeItem("password")
    // }

  return (
    <div className="App">
        <StartGameContext.Provider value={{handleStart}}>
        <AccountContext.Provider value={{account, setAccount}}>
            {
                page == "CardList" && <CardList back={handleGoBack} toGame={toGame} account={account}/>
            }
            {
                page == "DeckList" &&
                    <DeckList
                    decks={deckList}
                    select={handleSelect}
                    fetchDecks={handleFetchDecks}
                    />
            }
            {
                page == "Game" && <Game toCardList={toCardList}/>
            
            }
        </AccountContext.Provider>
        </StartGameContext.Provider>
    </div>
  );
}

export default App;

export {AccountContext}
export {StartGameContext}