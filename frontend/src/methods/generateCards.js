export default function generateCards(lort, playersasdasd) {
    // Create an empty array to store the generated cards
    let cards = [];
    let nameAmount = 0;

    let players = JSON.parse(localStorage.getItem("playerList"))
    console.log(players)
    

    // Loop through the lort array
    for (let i = 0; i < lort.length; i++) {
        // Get the current card and its prompt
        let card = lort[i];

        //legacy, ctrl+f 'length*10' solves this as well, and no need to check for multiple {p}'s
        // //for every {p1} and {p2} in the card string, increment nameAmount with 1
        // let p1 = card.prompt.includes("{p1}");
        // let p2 = card.prompt.includes("{p2}");
        // if (p1) {
        //     nameAmount++;
        // }
        // if (p2) {
        //     nameAmount++;
        // }

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
    // console.log(cards)

    let playerList = generatePlayerList(players, lort.length)
    console.log(playerList)
    
    


    console.log(cards)



    //loop through every card and check if it contains {p1} or {p2}
    let prevNames = [];
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];

        for (let j = 1; j <= 50; j++) {
            if (card.includes(`{p${j}}`)) {
                let k = 0;
                while (k < 50) {
                    if (prevNames.includes(playerList[k])) {
                        k++;
                    } else {
                        break;
                    }
                }
                if (k === 50) {
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

    
    //legacy
    // for (let i = 0; i < cards.length; i++) {
    //     let card = cards[i];
    //     let p1 = card.includes("{p1}");
    //     let p2 = card.includes("{p2}");

    //     let prevName

    //     if (p1) {
    //         //replace every instance of {p1} with the first name in the playerList array.
    //         card = card.replace(new RegExp("{p1}", "g"), playerList[0]);
    //         prevName = playerList[0]

    //         //remove playerList[0] from playerlist.
    //         playerList = playerList.slice(1)

            

    //         cards[i] = card;
    //     }
    //     if (p2) {
            
    //         //corner case for 2 same names right after eachother.
    //         if(prevName == playerList[0]){
    //             card = card.replace(new RegExp("{p2}", "g"), playerList[1]);
    //             playerList = playerList.slice(2)
    //         }
            
    //         else{
    //             card = card.replace(new RegExp("{p2}", "g"), playerList[0]);
    //             playerList = playerList.slice(1)
    //         }

    //         cards[i] = card;
    //     }
    // }

   

    return cards

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

}