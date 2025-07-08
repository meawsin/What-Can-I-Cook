const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, 'Full name is required'] 
  },
  username: { 
    type: String, 
    required: [true, 'Username is required'], 
    unique: true,
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required']
  },
  favoriteMeal: { 
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert'],
    default: 'Dinner' 
  },
  dietaryPreference: { 
    type: String,
    default: 'None'
  },
  allergies: {
    type: [String],
    default: []
  },
  favorites: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recipe' 
  }]
}, { 
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
