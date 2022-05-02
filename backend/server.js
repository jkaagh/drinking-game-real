const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const app = express()

app.use(cors())
app.use(express.json())

const cardRoutes = require("./routes/card-routes")
app.use("/card/", cardRoutes)

const deckRoutes = require("./routes/deck-routes")
app.use("/deck/", deckRoutes)


mongoose.connect("mongodb://localhost/drinkinggame")
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to database"))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {console.log("Server started!")})