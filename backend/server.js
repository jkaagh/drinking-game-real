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

const accountRoutes = require("./routes/account-routes");

app.use("/account/", accountRoutes)


const path = require("path")
app.use(express.static(path.join(__dirname, "build")))
// app.use('/static', express.static(path.join(__dirname, 'build')));
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'build')});
});


const config = require("./config");
const dbUrl = config.dbUrl;

var dboptions = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, dboptions, (err) => {
    if (err) console.log(err);

  });

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {console.log("Server started!")})