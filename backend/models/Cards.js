const mongoose = require("mongoose")

const CardSchema = new mongoose.Schema({
    
    prompt:{
        type: String,
        required: true,
    },
    deckId:{
        type: String,
        required: true,
    }

    
})

module.exports = mongoose.model("card", CardSchema)