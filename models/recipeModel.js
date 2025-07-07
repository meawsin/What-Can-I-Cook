const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Recipe title is required'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required']
  },
  instructions: { 
    type: String, 
    required: [true, 'Instructions are required'] 
  },
  imageUrl: { 
    type: String, 
    required: [true, 'Image URL is required'] 
  },
  mealType: { 
    type: String, 
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Drinks'],
    required: true
  },
  cuisine: {
    type: String
  },
  uploadedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // This links the recipe to the user who uploaded it
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
