const express = require('express');
const join = require('path').join;
const router = new express.Router();
const game = require('../controllers/gameController');
const player = require('../controllers/playersController');

router.use(express.static(join(__dirname, '../../wwwroot')));

router.get('/', async (req, res) => {
   res.render('home');
});

router.get('/user/:name', async (req, res) => {
   res.render('game', {user: name});
});

router.post('/player', async (req, res) => {
   player.createPlayer(req.body).then(data => res.json(data));    
});

router.post('/game/create', async (req, res) => {
   game.createGame(req.body).then(data => res.json(data));
});

router.get('/game', async (req, res) => {
   game.getGame().then(data => res.json(data));
});

router.post('/game/next', async (req, res) => {
   game.nextTurn(req.body).then(data => res.json(data));   
});

router.get('/player', async (req, res) => {
   player.getPlayer(req.query).then(data => res.json(data));
});

router.get('/player/cards', async (req, res) => {
   player.getPLayersCards().then(data => res.json(data));
});

module.exports = router;