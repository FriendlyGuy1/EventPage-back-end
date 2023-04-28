const Category = require("../models/CategoryModel");
const asyncHandler = require("express-async-handler");

// @desc Add Category
// @route POST /api/categories
// @access PUBLIC

const addCategory = asyncHandler(async (req, res) => {
  if (!req.body.category) {
    res.status(400).send({
      error: "Please type in a category",
    });
    return;
  }

  const category = await Category.create({
    category: req.body.category,
  });

  await category.save();
  res.status(200).send({
    success: `added new category (${req.body.category}) `,
  });
});

// @desc Get all Categories
// @route GET /api/categories
// @access PUBLIC

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  if (categories == "") {
    res.status(400).send({
      error: "There aren't any categories",
    });
  }

  res.status(200).json(categories);
});

// @desc update a Category
// @route GET /api/categories/:id
// @access PUBLIC

const updateCategory = asyncHandler(async (req, res) => {
  //check if id is correct
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(400).send({
        error: "Category does not exist",
      });
      return;
    }

    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateCategory);
  } else {
    res.status(400).send({
      error: "Category id is typed incorrectly",
    });
  }
});

// @desc Delete cateogry
// @route DELETE /api/categories/:id
// @access PUBLIC

const deleteCategory = asyncHandler(async (req, res) => {
  //check if id is correct
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(400).send({
        error: "Category does not exist",
      });
      return;
    }

    await category.deleteOne();

    res.status(200).json({
      success: `Category with id ${req.params.id} got deleted`,
    });
  } else {
    res.status(400).send({
      error: "Category id is typed incorrectly",
    });
  }
});

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
