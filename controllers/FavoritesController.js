const asyncHandler = require("express-async-handler");

const Favorite = require("../models/FavoritesModel");

// @desc Set Favorites
// @route POST /api/favorites
// @access PUBLIC

const setFavorite = asyncHandler(async (req, res) => {
  if (
    !req.body.userID ||
    !req.body.eventID 
  ) {
    res.status(400).send({
      error: "Please fill in all the fields",
    });
    return
  }
  const favorite = await Favorite.create({
    userID: req.body.userID,
    eventID: req.body.eventID,
  });
  res.status(200).json(favorite);
});

const getFavorite = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({});
  
    if (favorites == "") {
      res.status(400).send({
        error: "There are no favorites",
      });
    }
  
    res.status(200).json(favorites);
  });


module.exports = {
    setFavorite,
    getFavorite
}
