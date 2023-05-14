const express = require('express');
const router = express.Router();

const {
    getEvents,
    setEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/EventController');


const { protect } = require("../middleware/authMiddleware")

router.route('/').get(getEvents).post(protect,setEvent);
router.route('/:id').put(protect,updateEvent).delete(protect, deleteEvent);

module.exports = router;