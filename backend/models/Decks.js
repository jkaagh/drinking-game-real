const mongoose = require("mongoose")

const DeckSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    creator:{
        type: String,
        required: true,
    },
    creatorId:{
        type: String,
        required: true,
    },
    lastUpdate:{
        type: Date,
        default: Date.now
    },
    cardAmount:{
        type: Number,
        default: 0
    }
    
})

module.exports = mongoose.model("deck", DeckSchema)