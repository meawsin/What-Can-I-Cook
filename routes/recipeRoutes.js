const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes, seedRecipes } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

// Route to get all recipes (public) and create a new recipe (private)
router.route('/')
  .get(getAllRecipes)
  .post(protect, createRecipe);

// Route to seed sample recipes (for development)
router.post('/seed', seedRecipes);

module.exports = router;
