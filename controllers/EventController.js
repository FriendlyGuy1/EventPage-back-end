const asyncHandler = require("express-async-handler");

const Event = require("../models/EventModel");
const Favorite = require("../models/FavoritesModel")

// @desc Set event
// @route POST /api/events
// @access PRIVATE

const setEvent = asyncHandler(async (req, res) => {
  if (
    !req.body.title ||
    !req.body.category ||
    !req.body.description ||
    !req.body.place ||
    !req.body.date ||
    !req.body.image
  ) {
    res.status(400).send({
      error: "Please fill in all the fields",
    });
    return
  }
  const event = await Event.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    place: req.body.place,
    date: req.body.date,
    image: req.body.image,
    user: req.user.id
  });
  res.status(200).json(event);
});

// @desc check all events
// @route GET /api/events
// @access PUBLIC

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find(); 

  if (events == "") {
    res.status(400).send({
      error: "There are no events",
    });
  }

  res.status(200).json(events);
});

// @desc Update event
// @route PUT /api/events/:id
// @access PRIVATE

const updateEvent = asyncHandler(async (req, res) => {
  //check if id is correct
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(400).send({
        error: "Event does not exist",
      });
      return
    }
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    // checks if user is admin or the creator
    if (event.user.toString() !== req.user.id && req.user.role !== "admin"){
      res.status(401);
      throw new Error("Not authorized");
   }

   // checks if user tries to change approval
    if(req.body.approved && req.user.role !== "admin"){
      res.status(401);
      throw new Error("You can't change the approval");
   }

   if (req.user.role === "admin" || event.user.toString() === req.user.id){
    const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body ,{
        new: true
        
    })
    res.status(200).json(updateEvent);
  }


  } else {
    res.status(400).send({
      error: "Event id is typed incorrectly",
    });
  }
});

// @desc Delete event
// @route DELETE /api/events/:id
// @access PRIVATE

const deleteEvent = asyncHandler(async (req, res) => {
  //check if id is correct
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const event = await Event.findById(req.params.id);
    const favorites = await Favorite.find({eventID: req.params.id})

    if (!event) {
      res.status(400).send({
        error: "Event does not exist",
      });
      return
    }

    
    // checks if user is admin or the creator
    if (event.user.toString() !== req.user.id && req.user.role !== "admin") {
      res.status(401)
      throw new Error('User not authorized')
    }

    if (req.user.role === "admin" || event.user.toString() === req.user.id){
      await event.deleteOne();
    }

    res.status(200).json({
      success: `Event with id ${req.params.id} got deleted`,
    });

    if(!favorites == ""){
      await Favorite.deleteMany({eventID: req.params.id})
  }


  } else {
    res.status(400).send({
      error: "Event id is typed incorrectly",
    });
  }
});

module.exports = {
  setEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
