const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  toggleFavorite,
  getFavorites
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes for profile
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Private routes for favorites
router.route('/favorites')
  .get(protect, getFavorites);

router.route('/favorites/:recipeId')
  .put(protect, toggleFavorite);

module.exports = router;
