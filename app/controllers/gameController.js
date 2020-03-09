class Game {
   constructor(maxTurns, hero, monster) {
      this.maxTurns = maxTurns;
      this.current = 1;
      this.past = 0;
      this.left = maxTurns;
      this.hero = hero;
      this.monster = monster;
   }

   getGame() {
      const actualGame = {
         turns: {
            current: this.current,
            past: this.past,
            left: this.left,
         },
         players: {
            hero: this.hero,
            monster: this.monster,
         },
      }
      return actualGame;
   }

   nextTurn() {
      this.current++;
      this.past++;
      this.left = this.left - 1;
   }
}

let newGame;

async function _createGame(params) {
   const errors = [];
   if(!params.maxTurns) errors.push('Maximum turns is required');
   if(!params.hero) errors.push('Player is required');
   params.monster = params.monster || {name: 'Cthulhu'};
   if(errors.length) return {data: errors};
   const playersController =  require('./playersController'),
      hero = await playersController.createPlayer(params.hero, 'hero'),
      monster = await playersController.createPlayer(params.monster, 'monster');
   newGame = new Game(params.maxTurns, hero, monster);  
   return newGame.getGame();
}

async function _getGame() {
   if(!newGame) return {data: ['No game found']};
   return newGame.getGame();   
}

async function _nextTurn(params) {
   if(newGame.left === 0) {
      return {notification: 'END THE GAME'};
   }
   newGame.nextTurn();
   const playersController =  require('./playersController');
   
   const turn = await playersController.playTurn(params);
   
   if(newGame.hero.hp < 0) {
      return {notification: 'UPS.. YOU LOSE! :('};
   }
   if(newGame.monster.hp < 0) {
      return {notification: 'CONGRATULATIONS! YOU WIN! :)'};
   }

   return turn;
}

module.exports = {
   createGame: _createGame,
   getGame: _getGame,
   nextTurn: _nextTurn,
}