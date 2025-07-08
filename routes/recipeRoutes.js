const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes, seedRecipes, getRecipeById } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllRecipes)
  .post(protect, createRecipe);

router.post('/seed', seedRecipes);
router.get('/:id', getRecipeById);

module.exports = router;
