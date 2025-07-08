const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes, seedRecipes } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllRecipes)
  .post(protect, createRecipe);

router.post('/seed', seedRecipes);

module.exports = router;
