const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();


const favoriteCtrl = require ('../controllers/favorite');

router.post('/add-favorite/:omdbId',auth, favoriteCtrl.postFavorite); 
router.get('/get-favorites/:userId',auth, favoriteCtrl.getFavorite);
router.delete('/delete-favorite/:id',auth, favoriteCtrl.deleteFavorite);

module.exports = router;