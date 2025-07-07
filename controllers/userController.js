const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  // ... (existing registerUser code)
  const { fullName, username, email, password, favoriteMeal, dietaryPreference, allergies } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      password,
      favoriteMeal,
      dietaryPreference,
      allergies,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  // ... (existing loginUser code)
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email: username }, { username: username }] });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = async (req, res) => {
  // ... (existing getUserProfile code)
  const user = req.user; 

  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      favoriteMeal: user.favoriteMeal,
      dietaryPreference: user.dietaryPreference,
      allergies: user.allergies,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  // ... (existing updateUserProfile code)
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.dietaryPreference = req.body.dietaryPreference || user.dietaryPreference;
      user.favoriteMeal = req.body.favoriteMeal || user.favoriteMeal;
      user.allergies = req.body.allergies || user.allergies;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        username: updatedUser.username,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
     res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add/remove a recipe from user's favorites
// @route   PUT /api/users/favorites/:recipeId
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recipeId = req.params.recipeId;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.favorites.indexOf(recipeId);

    if (index > -1) {
      // Recipe is in favorites, remove it
      user.favorites.splice(index, 1);
    } else {
      // Recipe is not in favorites, add it
      user.favorites.push(recipeId);
    }

    await user.save();
    res.json(user.favorites);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user's favorite recipes
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    // Find the user and populate the 'favorites' field with full recipe documents
    const user = await User.findById(req.user._id).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favorites);
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  toggleFavorite,
  getFavorites,
};
