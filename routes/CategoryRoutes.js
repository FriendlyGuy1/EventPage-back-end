const express = require('express');
const router = express.Router();

const {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require("../controllers/CategoryController")

const { protectAdmin } = require("../middleware/adminAuthMiddleware")

router.route('/').get(getCategories).post(protectAdmin, addCategory);
router.route('/:id').put(protectAdmin, updateCategory).delete(protectAdmin, deleteCategory);

module.exports = router;