const asyncHandler = require("express-async-handler");

const Event = require("../models/EventModel");

// @desc Set event
// @route POST /api/events
// @access PUBLIC

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
  }
  const event = await Event.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    place: req.body.place,
    date: req.body.date,
    image: req.body.image,
  });
  res.status(200).json(event);
});

// @desc check all events
// @route GET /api/events
// @access PUBLIC

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});

  if (events == "") {
    res.status(400).send({
      error: "There are not events",
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
    }

    const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateEvent);
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

    if (!event) {
      res.status(400).send({
        error: "Event does not exist",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: `Event with id ${req.params.id} got deleted`,
    });
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
