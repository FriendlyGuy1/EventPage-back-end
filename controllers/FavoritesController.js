const asyncHandler = require("express-async-handler");

const Favorite = require("../models/FavoritesModel");
const Event = require("../models/EventModel")

// @desc Set Favorites
// @route POST /api/favorites
// @access PRIVATE

const setFavorite = asyncHandler(async (req, res) => {
  if (
    !req.body.eventID 
  ) {
    res.status(400)
    throw new Error('Fill in all the fields')
  }

  if (!req.user) {
    res.status(400)
    throw new Error('User is not logged in')
  }

  const duplicate = await Favorite.findOne({userID: req.user.id, eventID: req.body.eventID});

  if(duplicate){
    res.status(400)
    throw new Error("Favorite already exists")
  }

  const favorite = await Favorite.create({
    userID: req.user.id,
    eventID: req.body.eventID,
  });

  const AddToFavoriteCount = await Event.findByIdAndUpdate(req.body.eventID, {$inc : {favorites: 1}})

  await AddToFavoriteCount.save()


  res.status(200).json(favorite);
});

// @desc Get Favorites
// @route GET /api/favorites
// @access PRIVATE


const getFavorite = asyncHandler(async (req, res) => {

  if (!req.user) {
    res.status(400)
    throw new Error('User is not logged in')
  }

  const favorites = await Favorite.find({ userID: req.user.id});
  
  if (favorites == "") {
    res.status(400)
    throw new Error('This user does not have any favorites')
  }

  res.status(200).json(favorites);
});

// @desc DELETE favorites
// @route DELETE /api/favorites/:id
// @access PRIVATE

const deleteFavorite = asyncHandler(async (req, res) => {

  
  if (!req.user) {
    res.status(400)
    throw new Error('User is not logged in')
  }

  const favorite = await Favorite.findOne({ _id: req.params.id, userID: req.user.id});

  if(!favorite){
    res.status(400)
    throw new Error('Favorite does not exist')
  }


  await favorite.deleteOne();

  const SubtractFromFavoriteCount = await Event.findByIdAndUpdate(favorite.eventID.toString(), {$inc : {favorites: -1}})

  await SubtractFromFavoriteCount.save()


  res.status(200).json({
    success: `Favorite deleted`,
  });
});


module.exports = {
    setFavorite,
    getFavorite,
    deleteFavorite,
}
