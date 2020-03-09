const cards = require('./cardsController');

class Player {
   constructor(name, type, hand){
      this.name = name;
      this.type = type;
      this.status = 'Normal';
      this.hp = 100;
      this.shield = 0;
      this.hand = hand;
   }

   get statusPlayer() {
      return this.status;
   }

   set statusPlayer(status) {
      this.status = status;
   }
}

const players = [];

async function _createPlayer(params, type) {
   if(!params.name) return {data: ['Name is required']};
   const newPlayer = new Player(params.name, type, await initialCards());
   players.push(newPlayer);
   return newPlayer;
}

async function initialCards() { //Initial cards in hand (3)
   const hand = [];
   for(let i = 3; i--;) {
      hand.push(await cards.getCard());
   }
   return hand;
}

async function _getPlayer(params) {
   if(!params.type) return {data: ['Type query is required']};
   let player = {};
   players.forEach(p => {
      if(p.type === params.type.toLowerCase()) player = p;
   });
   return player;
}

async function _getPLayersCards() {
   let playersCards = {};
   players.forEach(p => {
      playersCards[p.type] = p.hand;
   });
   return playersCards;
}

async function _playTurn(params) {
   const typePlayer = {type: 'hero'},
      typeEnemy = {type: 'monster'};
   if(!params.cardIndex && params.cardIndex !== 0) {
      typePlayer.type = 'monster';
      typeEnemy.type = 'hero';
   }
   const player = await _getPlayer(typePlayer),
      enemy = await _getPlayer(typeEnemy),
      playerTurn = {
         player: player.name,
      }
      
   if(player.status === 'Normal') {
      const newCard = await _drawCard();
      player.hand.push(newCard);
      const choiceCard = await _playCard(player.hand, params.cardIndex);
      await _useEffect(choiceCard, player, enemy);
      playerTurn.playedCard = choiceCard;
   } else {
      playerTurn.status = "He's horrified can't move this turn";
      player.status = 'Normal';
   }

   return playerTurn;
}

async function _drawCard() {
   return await cards.getCard();
}

async function _playCard(hand, selectedCard) {
   if(typeof selectedCard !== 'number') selectedCard = getRandomInt(0, hand.length);
   const cardToUse = hand[selectedCard];
   hand.splice(selectedCard,1);
   return cardToUse;
}

async function _useEffect(card, player, enemy) {
   if(Object.keys(card.effect)[0] === 'heal') {
      player.hp = player.hp  + card.effect.heal;
   }
   if(Object.keys(card.effect)[0] === 'shield') {
      player.shield = player.shield  + card.effect.shield;
   }
   if(Object.keys(card.effect)[0] === 'damage') {
      if(enemy.shield) {
         if(enemy.shield > card.effect.damage) enemy.shield = enemy.shield - card.effect.damage;
         if(enemy.shield < card.effect.damage) {
            enemy.hp = enemy.hp - Math.abs(enemy.shield - card.effect.damage);
            enemy.shield = 0;
         }   
      } else {
         enemy.hp = enemy.hp - card.effect.damage;
      }
   }
   if(Object.keys(card.effect)[0] === 'horror') {
      enemy.status = 'Horrified';
   }
}

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
   createPlayer: _createPlayer,
   getPlayer: _getPlayer,
   getPLayersCards: _getPLayersCards,
   playTurn: _playTurn,
}