const express = require("express")
const { update } = require("../models/Cards")
const Card = require("../models/Cards")
const Deck = require("../models/Decks")

router = express.Router()

router.get("/fetch/:id", async(req, res) => {
    
    let cards
    try{
        cards = await Card.find({deckId: req.params.id})
    }catch(error){
        return res.send({success: false, msg: error})
    }
   
    // await delay(1000)
    
    return res.send({success: true, data:cards})
    

})

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  } 
  

router.post("/create/", async(req, res) => {
    
    const card = new Card({
        prompt: req.body.prompt,
        deckId: req.body.id,
    })

    try{
        await card.save()
    }catch(err){
        console.log(err)
        return res.send({success: false, msg: err})
        
    }
    


    let cardAmount;
   
    try{
        cardAmount = await Card.find({deckId:req.body.id})
    }catch(err){
        console.log(err)
    }
    console.log(cardAmount.length)
    try{
    await (Deck.findByIdAndUpdate(req.body.id, {cardAmount: cardAmount.length}, {new: true}))
        
    }catch(err){
        console.log(err)
    }

 

    return res.send({success: true, msg:"Added card to deck!"})
})

router.delete("/delete/:id", async(req, res) => {



    try{
        let card = await Card.findById(req.params.id)
        console.log(card)
        
        let cardAmount = await Card.find({deckId:card.deckId})

        console.log(cardAmount.length - 1)
        await (Deck.findByIdAndUpdate(card.deckId, {cardAmount: cardAmount.length -1}, {new: true}))


        await Card.findByIdAndDelete(req.params.id)
    }catch(err){
        return res.send({success: false, msg:err})
    }
    
    res.send({success: true, msg:"Successfully deleted card."})
})



module.exports = router