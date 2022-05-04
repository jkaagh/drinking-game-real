const mongoose = require("mongoose")

const AccountSchema = new mongoose.Schema({
    
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    admin:{
        type: Boolean,
        default: false,
    },



    
})

module.exports = mongoose.model("account", AccountSchema)