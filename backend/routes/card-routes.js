const express = require("express")
const { update } = require("../models/Cards")
const Card = require("../models/Cards")
const Deck = require("../models/Decks")
const Account = require("../models/Account")

router = express.Router()

router.get("/fetch/:id", async(req, res) => {
    
    let cards
    try{
        cards = await Card.find({deckId: req.params.id})
    }catch(error){
        return res.send({success: false, msg: error})
    }

    let deck
    try{
        deck = await Deck.findById(req.params.id)	
    }catch(error){
        return res.send({success: false, msg: error})
    }
    
   
    // await delay(1000)
    try{

        return res.send({success: true, data:cards, creator:deck.creator})
    }catch(err){

    }
    

})

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  } 
  

router.post("/create/", async(req, res) => {
    
    //check if allowed to add card.
    let deck 
    let acc
    try{
        deck = await Deck.findById(req.body.id)
        acc = await Account.find({password: req.body.password})
    }catch(err){
        console.log(err)
    }

    //if the deck you're trying to edit has the same creator as the password
    if(acc[0]._id != deck.creatorId){
        return res.send({success: false, msg:"Wrong account!"})
    }
   

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
    
    try{
    await (Deck.findByIdAndUpdate(req.body.id, {cardAmount: cardAmount.length}, {new: true}))
        
    }catch(err){
        console.log(err)
    }

 

    return res.send({success: true, msg:"Added card to deck!"})
})

router.delete("/delete/:id/:password", async(req, res) => {

    let card 

    try{
        card = await Card.findById(req.params.id)
    }
    catch(err){
        console.log(err)
    }


    let deck 
    let acc
    try{
        deck = await Deck.findById(card.deckId)
        acc = await Account.find({password: req.params.password})
    }catch(err){
        console.log(err)
    }

    console.log(deck)
    console.log(acc)
    
    //if the deck you're trying to edit has the same creator as the password
    if(acc[0]._id != deck.creatorId){
        return res.send({success: false, msg:"Wrong account!"})
    }

    try{
        // let card = await Card.findById(req.params.id)
        
        
        let cardAmount = await Card.find({deckId:card.deckId})

        
        await (Deck.findByIdAndUpdate(card.deckId, {cardAmount: cardAmount.length -1}, {new: true}))


        await Card.findByIdAndDelete(req.params.id)
    }catch(err){
        return res.send({success: false, msg:err})
    }
    
    res.send({success: true, msg:"Successfully deleted card."})
})





module.exports = router