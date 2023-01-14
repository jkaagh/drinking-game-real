export default function generateCards(lort) {
    // Create an empty array to store the generated cards
    let cards = [];

    // Loop through the lort array
    for (let i = 0; i < lort.length; i++) {
        // Get the current card and its prompt
        let card = lort[i];

        let prompt = card.prompt;

        // Check if the card has the 'duplicates' option
        if (card.options && card.options.duplicates) {

            // console.log(card.options)
            // If it does, get the number of duplicates
            let duplicates = card.options.duplicates;

            // Add the number of duplicates of the current card to the array
            for (let j = 0; j < duplicates; j++) {
                cards.push(prompt);
            }
        } else {
            // If it doesn't, just add the current card to the array
            cards.push(prompt);
        }
    }

   

    // Shuffle the cards array
    shuffle(cards);

    //save shuffled unedited deck for later use
    localStorage.setItem("ShuffledDeckNoNames", JSON.stringify(cards))

    cards = InsertPlayers(cards)
    return cards

   




}

export function UpdatePlayerlist() {

    let cards = JSON.parse(localStorage.getItem("ShuffledDeckNoNames"))

    return(InsertPlayers(cards))

}


function InsertPlayers(cards){

    let players = JSON.parse(localStorage.getItem("playerList"))
    if(players.length == 0){
        players.push("Player")
    }
    let playerList = generatePlayerList(players, cards.length)
    

    //loop through every card and check if it contains any {p}'s
    let prevNames = [];
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];

        for (let j = 1; j <= 50; j++) { //runs through a max of 50 p's
            if (card.includes(`{p${j}}`)) {
                let k = 0;
                while (k < 20) {
                    if (prevNames.includes(playerList[k])) {
                        k++;
                    } else {
                        break;
                    }
                }
                if (k === 20) {
                    console.log("i gave up and reset prevNames")
                    prevNames = []
                    k = 0
                }
                prevNames.push(playerList[k]);
                card = card.replace(new RegExp(`{p${j}}`, "g"), playerList[k]);
                playerList = playerList.slice(0, k).concat(playerList.slice(k + 1));
                cards[i] = card;
                
            }
            
        }
        prevNames = [];
    }


    return cards
   
}

function generatePlayerList(players, length) {
    let PlayerList = [];
    while (PlayerList.length < length*50) {
        shuffle(players);
        PlayerList.push(...players);
    }
    return PlayerList;
}

// Helper function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}