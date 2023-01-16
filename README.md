# Drinkoo - A Party Game App
## Create and Play Your Own Custom Drinking Game

### Introduction
Are you tired of playing the same old drinking games? Want to spice things up with custom cards and player lists? Look no further than Drinkoo! 

- Currently not for public use, see the Try it out section.

### Features
With Drinkoo, you have the ability to fully customize your game experience. Create your own decks and cards, with the option to select multiple decks to use together. This allows for endless possibilities and a new game experience with each play through.

Additionally, you have the ability to customize your player list on the fly, making it easy to add or remove players as needed. This ensures that the game is always tailored to the players in the room, making for a more enjoyable experience for everyone.

In short, Drinkoo allows you to create your own game, customize it as you play and play with multiple decks together. Making the game experience unique and enjoyable every time.

### Randomizing Algorithm
Our randomizing algorithm ensures fair game play by picking players at random but on average as often as each other. You can also reference specific players in your custom card prompts using the notation {p1} to reference a random player in the list and {p2} to reference another random player - for each card.

For example, the prompt:

> {p1} cannot come up with a good example, so {p2} suggests writing this. {p1} is now happy.

Will turn into:

> Johannes cannot come up with a good example, so Magnus suggests writing this. Johannes is now happy.

You can have up to 50 {p}'s, and as many players as you want.
To see how it works, check out the code here: /frontend/src/methods/generateCards.js

### Try it out
Try it out for yourself by visiting https://drinkoo.onrender.com and login with the password 'linkedindemo' to test creating your own decks or use what others have created.

Please note the app is not ready for public use, contact me if you want an account.

### Technicalities
Please note that the login system is only temporary and will be replaced with a normal user authentication system once the app is developed for public use. Features such as a deck browser with sharing, rating, and copying will also be added.

- Frontend created with React and TailwindCSS. 
- Backend created with Node.js, Express, MongoDB. Hosted on https://render.com. 
- Many hours of work and life expectancy spared with OpenAI ChatGPT.
