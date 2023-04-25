const express = require('express');
const router = express.Router();

const {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require("../controllers/CategoryController")


router.route('/').get(getCategories).post(addCategory);
router.route('/:id').put(updateCategory).delete(deleteCategory);

module.exports = router;