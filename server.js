const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes'); // Import recipe routes

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

app.use(express.static(path.join(__dirname, 'Frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in your .env file.');
  process.exit(1);
}
mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.post('/api/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ 
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.get('/api/debug/recipes', async (req, res) => {
  try {
    const Recipe = require('./models/recipeModel');
    const recipes = await Recipe.find({}).populate('uploadedBy', 'username');
    res.json({
      count: recipes.length,
      recipes: recipes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/debug/create-sample-recipes', async (req, res) => {
  try {
    const Recipe = require('./models/recipeModel');
    const User = require('./models/userModel');
    
    let user = await User.findOne({});
    if (!user) {
      user = await User.create({
        fullName: 'Sample User',
        username: 'sampleuser',
        email: 'sample@example.com',
        password: 'password123',
        favoriteMeal: 'Dinner'
      });
    }

    const sampleRecipes = [
      {
        title: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish with eggs, cheese, and pancetta',
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper', 'Salt'],
        instructions: '1. Cook spaghetti in salted water\n2. Fry pancetta until crispy\n3. Beat eggs with cheese\n4. Mix hot pasta with egg mixture\n5. Add pancetta and serve',
        imageUrl: 'images/placeholder_recipe.jpg',
        mealType: 'Dinner',
        cuisine: 'Italian',
        uploadedBy: user._id
      },
      {
        title: 'Chocolate Chip Cookies',
        description: 'Soft and chewy chocolate chip cookies',
        ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Chocolate chips', 'Vanilla extract'],
        instructions: '1. Cream butter and sugar\n2. Add eggs and vanilla\n3. Mix in flour and chocolate chips\n4. Bake at 350°F for 10-12 minutes',
        imageUrl: 'images/placeholder_recipe.jpg',
        mealType: 'Dessert',
        cuisine: 'American',
        uploadedBy: user._id
      },
      {
        title: 'Chicken Stir Fry',
        description: 'Quick and healthy chicken stir fry with vegetables',
        ingredients: ['Chicken breast', 'Broccoli', 'Carrots', 'Soy sauce', 'Garlic', 'Ginger'],
        instructions: '1. Cut chicken into pieces\n2. Stir fry chicken until cooked\n3. Add vegetables\n4. Season with soy sauce and spices',
        imageUrl: 'images/placeholder_recipe.jpg',
        mealType: 'Dinner',
        cuisine: 'Asian',
        uploadedBy: user._id
      }
    ];

    const createdRecipes = await Recipe.insertMany(sampleRecipes);
    res.json({ 
      message: 'Sample recipes created successfully',
      count: createdRecipes.length,
      recipes: createdRecipes
    });
  } catch (error) {
    console.error('Error creating sample recipes:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend! 👋' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
