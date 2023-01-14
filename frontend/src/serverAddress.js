let online = true

const address = {
    address: "http://localhost:3001"
}


if (online) address.address = "https://drinkoo.herokuapp.com"

module.exports = address