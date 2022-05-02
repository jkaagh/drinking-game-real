import React, {useState, useEffect} from "react";
import axios from "axios"
import CardList from "./Components/CardList";
import Game from "./Components/Game";
import DeckList from "./DeckList/DeckList";
import serverAdress from "./serverAddress"

function App() {

    const [page, setPage] = useState("")

    //holds list of decks. this is fetched on app boot and when click refresh button or when go to decklist page
    const [deckList, setDeckList] = useState([])

    //on app boot
    useEffect(() => {
        
        if(localStorage.getItem("ingame") != null){
            console.log("asdasd")
            setPage("Game")
            return
        }

        //only checks if a deck is selected. this will probably only run once per user.
        if(localStorage.getItem("selectedDeck") == null){
            //show list of decks
            setPage("DeckList")
            handleFetchDecks()
        }
        else{
            setPage("CardList")
        }

       
        

    }, [])
    

    //selects a deck and goes to CardList screen
    const handleSelect = (id) => {
        localStorage.setItem("selectedDeck", id)
        setPage("CardList")
    }

    //sets page to DeckList.js note to self: make 1 function to set page to this, and reuse everywhere.
    const handleGoBack = () =>{
        setPage("DeckList")
        handleFetchDecks()
    }

    const handleFetchDecks = () => {
       
        axios.get(serverAdress.address + "/deck/fetch")
        .then((response) => {
           
            if(response.data.success){
                setDeckList(response.data.data)
            }
        })
    }

    const toGame = () => {
        setPage("Game")
    }
   
    const toCardList = () => {
        setPage("CardList")
    }



  return (
    <div className="App">
        {/* <BrowserRouter>
            <Routes>
                <Route path="/" element={<CardList />} />
                <Route path="play/" element={<Game />} />
            </Routes>
        </BrowserRouter> */}
    {
        page == "CardList" && <CardList back={handleGoBack} toGame={toGame}/>
       
    }
    {
        page == "DeckList" && <DeckList decks={deckList} select={handleSelect} fetchDecks={handleFetchDecks}/>
       
    }
     {
        page == "Game" && <Game toCardList={toCardList}/>
       
    }

    </div>
  );
}

export default App;
