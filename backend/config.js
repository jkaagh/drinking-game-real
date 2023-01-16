require('dotenv').config()

let config = {
    dbUrl: `mongodb+srv://noldemor:${process.env.DB_PASSWORD}@cluster0.tcn5q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}

module.exports = config