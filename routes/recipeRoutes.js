const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

// Route to get all recipes (public) and create a new recipe (private)
router.route('/')
  .get(getAllRecipes)
  .post(protect, createRecipe);

module.exports = router;
