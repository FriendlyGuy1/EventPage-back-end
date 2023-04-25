const express = require('express');
const router = express.Router();

const {
    getFavorite,
    setFavorite,
} = require('../controllers/FavoritesController');


router.route('/').get(getFavorite).post(setFavorite);

module.exports = router;