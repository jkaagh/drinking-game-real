export default function GenerateDeck(deck) {




    //generate list of players, used for inserting at %player%'s
    let PlayerList = GeneratePlayerList(deck.length)




    //shuffle deck: Find random card in deck and check it for any special attributes.

    let ClonedDeck = JSON.parse(JSON.stringify(deck))
    let ShuffledDeck = []

    while (ClonedDeck.length > 0) {
        //pick random card
        const index = Math.floor(Math.random() * ClonedDeck.length);
        let card = ClonedDeck[index]


        //todo handle special properties like
        //for example, if a card can only appear after 30% of the deck, return
        //in general every other mechanic is used here.
        //generate new cards to put into deck.

        //insert into ShuffledDeck
        ShuffledDeck.push(card)
        ClonedDeck.splice(index, 1)
    }



    //loop through each newly shuffled card and update names.

    ShuffledDeck.forEach(card => {

        //handle %player% (all random)

        if (card.prompt.includes("%p%")) {

            let clonedPrompt = card.prompt

            //splits the prompt into different strings: (3) ['dingedut ', ' tingenot ', ' skammel.']
            const testarray = clonedPrompt.split("%p%")

            //now i can concat player names in between them.
            let result = ""
            for (let j = 0; j < testarray.length; j++) {

                //if at the last part, dont add name after.
                if (j == testarray.length - 1) {
                    result = result.concat(testarray[j])
                }
                else {
                    result = result.concat(testarray[j], "magnus")

                    //TODO REPLACE WITH NAME FROM LIST, HANDLE MULTIPLE NAMES NOT BEING THE SAME.
                }


            }

            console.log(result)

        }

    });


    return null

}


const GeneratePlayerList = (length) => {

    //explanation:
    //generates "chunks" of players in random order: [2, 3, 1, 4] (numbers are player names)
    //these chunks are then connected to form a long list: [2, 3, 1, 4, 3, 1, 2, 4]
    //this ensures there is very little waiting time for individual players.

    const cards = length
    const playerList = JSON.parse(localStorage.getItem("PlayerList"))
    const chunkAmount = Math.ceil(cards / playerList.length)

    console.log(playerList)


    let list = []
    for (let i = 0; i < chunkAmount; i++) {

        let chunk = playerList
        chunk.sort(() => Math.random() - 0.5)
        for (let i = 0; i < chunk.length; i++) {
            list.push(chunk[i])

        }

    }

    return list

}