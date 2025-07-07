const Recipe = require('../models/recipeModel');

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Private
const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, imageUrl, mealType, cuisine } = req.body;

    // Basic validation
    if (!title || !description || !ingredients || !instructions || !imageUrl || !mealType) {
      return res.status(400).json({ message: 'Please fill out all required fields.' });
    }

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      imageUrl,
      mealType,
      cuisine,
      uploadedBy: req.user._id, // Get the user ID from the protect middleware
    });

    const createdRecipe = await recipe.save();
    res.status(201).json(createdRecipe);

  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getAllRecipes = async (req, res) => {
  try {
    // We can add filtering and pagination here later
    const recipes = await Recipe.find({}).populate('uploadedBy', 'username'); // Show the username of who uploaded it
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
