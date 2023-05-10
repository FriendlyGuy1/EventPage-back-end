const express = require('express');
const router = express.Router();

const {
    getEvents,
    setEvent,
    updateEvent,
    deleteEvent,
    approveEvent,
    disapproveEvent,
} = require('../controllers/EventController');

const { protectAdmin } = require("../middleware/adminAuthMiddleware")
const { protect } = require("../middleware/authMiddleware")



router.route('/').get(getEvents).post(protect,setEvent);
router.route('/:id').put(protect,updateEvent).delete(protect, deleteEvent);
router.route('/approve/:id').put(protectAdmin,approveEvent)
router.route('/disapprove/:id').put(protectAdmin,disapproveEvent)

module.exports = router;