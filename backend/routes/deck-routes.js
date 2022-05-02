const express = require("express")
const Deck = require("../models/Decks")

router = express.Router()

router.post("/create/", async(req, res) => {
   
    const deck = new Deck({
        name: req.body.name,
        creator: req.body.creator
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

router.delete("/delete/:id", async(req, res) => {
    try{

        await Deck.findByIdAndDelete(req.params.id)
    }catch(err){
        console.log(err)
        res.send({success: false})
    }
    res.send({success: true})
})
module.exports = router