const express = require('express');
const router = express.Router();

const {
    getFavorite,
    setFavorite,
    deleteFavorite,
} = require('../controllers/FavoritesController');

const { protect } = require("../middleware/authMiddleware")

router.route('/').get(protect, getFavorite).post(protect, setFavorite);
router.route("/:id").delete(protect, deleteFavorite)

module.exports = router;