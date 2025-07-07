const Recipe = require('../models/recipeModel');
const mongoose = require('mongoose');

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Private
const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, imageUrl, mealType, cuisine } = req.body;

    // Enhanced validation
    if (!title || !description || !ingredients || !instructions || !imageUrl || !mealType) {
      return res.status(400).json({ message: 'Please fill out all required fields.' });
    }

    // Validate ingredients array
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ message: 'Ingredients must be a non-empty array.' });
    }

    // Validate meal type
    const validMealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Drinks'];
    if (!validMealTypes.includes(mealType)) {
      return res.status(400).json({ message: 'Invalid meal type.' });
    }

    // Validate title length
    if (title.length < 3 || title.length > 100) {
      return res.status(400).json({ message: 'Title must be between 3 and 100 characters.' });
    }

    const recipe = new Recipe({
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients.map(ing => ing.trim()).filter(ing => ing.length > 0),
      instructions: instructions.trim(),
      imageUrl,
      mealType,
      cuisine: cuisine ? cuisine.trim() : '',
      uploadedBy: req.user._id, // Get the user ID from the protect middleware
    });

    const createdRecipe = await recipe.save();
    res.status(201).json(createdRecipe);

  } catch (error) {
    console.error('Error creating recipe:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getAllRecipes = async (req, res) => {
  try {
    const { mealType, search, cuisine } = req.query;
    
    // Build filter object
    let filter = {};
    
    // Filter by meal type if provided
    if (mealType) {
      filter.mealType = mealType;
    }
    
    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { ingredients: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by cuisine if provided
    if (cuisine) {
      filter.cuisine = { $regex: cuisine, $options: 'i' };
    }

    const recipes = await Recipe.find(filter).populate('uploadedBy', 'username');
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Seed sample recipes
// @route   POST /api/recipes/seed
// @access  Public (for development)
const seedRecipes = async (req, res) => {
  try {
    const sampleRecipes = [
      {
        title: "Classic Pancakes",
        description: "Fluffy and delicious homemade pancakes perfect for breakfast",
        ingredients: ["2 cups all-purpose flour", "2 tablespoons sugar", "2 teaspoons baking powder", "1/2 teaspoon salt", "2 eggs", "1 3/4 cups milk", "1/4 cup melted butter"],
        instructions: "1. Mix dry ingredients\n2. Beat eggs and milk\n3. Combine wet and dry ingredients\n4. Cook on hot griddle until bubbles form\n5. Flip and cook other side",
        imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500",
        mealType: "Breakfast",
        cuisine: "American"
      },
      {
        title: "Avocado Toast",
        description: "Healthy and trendy avocado toast with poached eggs",
        ingredients: ["2 slices whole grain bread", "1 ripe avocado", "2 eggs", "Salt and pepper", "Red pepper flakes", "Fresh herbs"],
        instructions: "1. Toast bread until golden\n2. Mash avocado with salt and pepper\n3. Poach eggs\n4. Spread avocado on toast\n5. Top with poached eggs and herbs",
        imageUrl: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500",
        mealType: "Breakfast",
        cuisine: "International"
      },
      {
        title: "Greek Salad",
        description: "Fresh Mediterranean salad with feta cheese and olives",
        ingredients: ["Cucumber", "Tomatoes", "Red onion", "Kalamata olives", "Feta cheese", "Olive oil", "Lemon juice", "Oregano"],
        instructions: "1. Chop vegetables\n2. Combine in bowl\n3. Add olives and feta\n4. Dress with olive oil and lemon\n5. Season with oregano",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
        mealType: "Lunch",
        cuisine: "Greek"
      },
      {
        title: "Chicken Caesar Salad",
        description: "Classic Caesar salad with grilled chicken breast",
        ingredients: ["Romaine lettuce", "Grilled chicken breast", "Parmesan cheese", "Croutons", "Caesar dressing", "Black pepper"],
        instructions: "1. Grill chicken breast\n2. Chop lettuce\n3. Add croutons and parmesan\n4. Toss with dressing\n5. Top with sliced chicken",
        imageUrl: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500",
        mealType: "Lunch",
        cuisine: "Italian"
      },
      {
        title: "Grilled Salmon",
        description: "Perfectly grilled salmon with herbs and lemon",
        ingredients: ["Salmon fillet", "Lemon", "Fresh herbs", "Olive oil", "Garlic", "Salt and pepper"],
        instructions: "1. Season salmon with herbs and garlic\n2. Heat grill to medium-high\n3. Grill salmon 4-5 minutes per side\n4. Squeeze lemon over top\n5. Serve immediately",
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
        mealType: "Dinner",
        cuisine: "Mediterranean"
      },
      {
        title: "Beef Stir Fry",
        description: "Quick and flavorful beef stir fry with vegetables",
        ingredients: ["Beef strips", "Broccoli", "Bell peppers", "Soy sauce", "Ginger", "Garlic", "Sesame oil"],
        instructions: "1. Marinate beef in soy sauce\n2. Stir fry beef until browned\n3. Add vegetables\n4. Season with ginger and garlic\n5. Finish with sesame oil",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500",
        mealType: "Dinner",
        cuisine: "Asian"
      },
      {
        title: "Chocolate Chip Cookies",
        description: "Classic homemade chocolate chip cookies",
        ingredients: ["2 1/4 cups flour", "1 cup butter", "3/4 cup sugar", "3/4 cup brown sugar", "2 eggs", "1 tsp vanilla", "2 cups chocolate chips"],
        instructions: "1. Cream butter and sugars\n2. Beat in eggs and vanilla\n3. Mix in flour and chocolate chips\n4. Drop spoonfuls on baking sheet\n5. Bake at 375°F for 10-12 minutes",
        imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500",
        mealType: "Dessert",
        cuisine: "American"
      },
      {
        title: "Tiramisu",
        description: "Italian coffee-flavored dessert with mascarpone cream",
        ingredients: ["Ladyfinger cookies", "Mascarpone cheese", "Eggs", "Sugar", "Strong coffee", "Cocoa powder"],
        instructions: "1. Dip ladyfingers in coffee\n2. Layer in dish\n3. Beat mascarpone with egg yolks and sugar\n4. Spread over cookies\n5. Dust with cocoa powder",
        imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500",
        mealType: "Dessert",
        cuisine: "Italian"
      },
      {
        title: "Hummus with Pita",
        description: "Creamy chickpea hummus served with warm pita bread",
        ingredients: ["Chickpeas", "Tahini", "Lemon juice", "Garlic", "Olive oil", "Cumin", "Pita bread"],
        instructions: "1. Blend chickpeas with tahini\n2. Add lemon juice and garlic\n3. Season with cumin\n4. Drizzle with olive oil\n5. Serve with warm pita",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
        mealType: "Snacks",
        cuisine: "Middle Eastern"
      },
      {
        title: "Popcorn",
        description: "Homemade stovetop popcorn with butter and salt",
        ingredients: ["Popcorn kernels", "Butter", "Salt", "Vegetable oil"],
        instructions: "1. Heat oil in large pot\n2. Add popcorn kernels\n3. Cover and shake occasionally\n4. Remove from heat when popping slows\n5. Toss with melted butter and salt",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
        mealType: "Snacks",
        cuisine: "American"
      },
      {
        title: "Smoothie Bowl",
        description: "Colorful and nutritious smoothie bowl with fresh fruits",
        ingredients: ["Frozen berries", "Banana", "Greek yogurt", "Honey", "Granola", "Fresh fruits", "Chia seeds"],
        instructions: "1. Blend frozen fruits with yogurt\n2. Pour into bowl\n3. Top with granola and fresh fruits\n4. Drizzle with honey\n5. Sprinkle chia seeds",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
        mealType: "Breakfast",
        cuisine: "International"
      },
      {
        title: "Iced Coffee",
        description: "Refreshing homemade iced coffee with cream",
        ingredients: ["Strong coffee", "Ice cubes", "Milk or cream", "Sugar", "Vanilla extract"],
        instructions: "1. Brew strong coffee\n2. Let cool to room temperature\n3. Fill glass with ice\n4. Pour coffee over ice\n5. Add milk and sugar to taste",
        imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
        mealType: "Drinks",
        cuisine: "International"
      },
      {
        title: "Green Tea",
        description: "Soothing green tea with honey and lemon",
        ingredients: ["Green tea bags", "Hot water", "Honey", "Lemon slices", "Fresh mint"],
        instructions: "1. Boil water to 175°F\n2. Steep green tea for 3 minutes\n3. Remove tea bags\n4. Add honey and lemon\n5. Garnish with mint",
        imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
        mealType: "Drinks",
        cuisine: "Asian"
      }
    ];

    // Clear existing recipes (optional - remove this line if you want to keep existing)
    await Recipe.deleteMany({});
    
    // Create a dummy user ID for seeding (since uploadedBy is required)
    const dummyUserId = new mongoose.Types.ObjectId();
    
    // Insert sample recipes with dummy user ID
    const createdRecipes = await Recipe.insertMany(
      sampleRecipes.map(recipe => ({ ...recipe, uploadedBy: dummyUserId }))
    );
    
    res.status(201).json({ 
      message: `Successfully seeded ${createdRecipes.length} recipes`,
      recipes: createdRecipes 
    });
  } catch (error) {
    console.error('Error seeding recipes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  seedRecipes,
};
