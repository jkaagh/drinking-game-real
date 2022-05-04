const express = require("express")
const Account = require("../models/Account")

router = express.Router()

router.get("/login/:password", async(req, res) => {
    console.log(req.params)

    let acc = await Account.find({password: req.params.password})
    
    if(acc.length == 0){
        return res.send({success: false, msg:"Account not found"})
    }
    
    return res.send({
        success: true,
        msg:"Logged in!",
        data: {
            name: acc[0].name,
            admin: acc[0].admin,
            password: acc[0].password,
        }
    })
    
})

router.get("/list/:password", async(req, res) => {
    
    
    try{

        let acc = await Account.find({password: req.params.password})
        console.log(acc)
        if(acc[0].admin !== true) return 



        let list = await Account.find()

        return res.send(list)
    }catch(err){
        
    }

})

router.post("/create/", async(req, res) => {
    console.log(req.body)
    
    if(req.body.name.length == 0 || req.body.password.length == 0) return res.send({success: false, msg:"Specify name and password"})

        let acc = new Account({
        name: req.body.name,
        admin: false,
        password: req.body.password
    })

    try{
        await acc.save()
        return res.send({success: true, msg:"Account created!"})
    }catch(err){
        console.log(err)
    }
    return
})

module.exports = router

//create admin account


    // let acc = new Account({
    //     name: "Johannes",
    //     admin: true,
    //     password: "MagnusErAutist123"
    // })

    // try{
    //     await acc.save()
    //     console.log("it worked!")
    // }catch(err){
    //     console.log(err)
    // }

