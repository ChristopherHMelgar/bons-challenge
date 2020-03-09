class Card {
   constructor(name, effect){
      this.name = name;
      this.effect = effect;
   }
}

async function _getCard() {
   const cardsDb = require('../db/cards');
   const randomCard = cardsDb[getRandomInt(0, cardsDb.length)];
   return new Card(randomCard.name, randomCard.effect);
}

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
   getCard: _getCard,
}
