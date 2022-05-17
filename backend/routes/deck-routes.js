const express = require("express")
const Deck = require("../models/Decks")
const Account = require("../models/Account")
const Card = require("../models/Cards")

router = express.Router()

router.post("/create/", async(req, res) => {
    
    //find user
    let user = await Account.find({password: req.body.password})

    //how many decks does the user already have?
    let existingDecks = await Deck.find({creatorId: user[0]._id})
    console.log(existingDecks.length)

    if(existingDecks.length >= 10) return res.send({success: false, msg:"You already have the maximum of 10 decks."})
    //if above 10 return
    
    //if no name for deck sent, inform client
    if(req.body.name.length == 0){
        return res.send({success: false, msg:"Deck must have a name"})
    }
    
    const deck = new Deck({
        name: req.body.name,
        creator: user[0].name,
        creatorId: user[0]._id
    })


    try{
        await deck.save()
    }catch(error){
        return res.send({success: false, msg: error})
    }
    console.log("deck created!")
    return res.send({success: true, msg:"Successfully created deck!"})
})

router.get("/fetch/", async(req, res) => {
    let decks
    try{
        decks = await Deck.find()
    }catch(error){
        return res.send({success: false, msg: error})
    }
    
    return res.send({success: true, data:decks})
})

router.delete("/delete/:id/:password", async(req, res) => {

    console.log(req.params.password)
    console.log(req.params.id)

    let deck 
    let acc
    try{
        deck = await Deck.findById(req.params.id)
        acc = await Account.find({password: req.params.password})
    }catch(err){
        console.log(err)
    }


    try{
        //if the deck you're trying to edit has the same creator as the password
        if(acc[0]._id != deck.creatorId){
            return res.send({success: false, msg:"Wrong account!"})
        }
    }catch(err){
        return console.log(err)
    }

    

    try{
        await Card.deleteMany({deckId: deck._id})
        await Deck.findByIdAndDelete(req.params.id)

    }catch(err){
        console.log(err)
        res.send({success: false})
    }
    res.send({success: true})
})
module.exports = router