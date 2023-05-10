const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUsers,
    deleteUser
} = require('../controllers/UserController');

const { protectAdmin } = require("../middleware/adminAuthMiddleware")

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/list').get(protectAdmin,getUsers);
router.route('/remove/:id').delete(protectAdmin,deleteUser);


module.exports = router;