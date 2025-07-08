# What Can I Cook? 🍳

A full-stack web application that helps users discover recipes based on available ingredients and dietary preferences.

## Features

- **User Authentication**: Register, login, and manage user profiles
- **Recipe Management**: Upload, view, and search recipes
- **Favorites System**: Save and manage favorite recipes
- **Dietary Preferences**: Filter recipes by dietary restrictions
- **Meal Categories**: Browse recipes by meal type (Breakfast, Lunch, Dinner, Snacks, Dessert, Drinks)
- **Search & Filter**: Find recipes by ingredients, cuisine, or meal type
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Image Upload**: Upload real images for recipes
- **Loading Indicators**: Smooth user experience with loading states
- **Live Search Modal**: Search recipes by name or ingredient from any main page
- **Responsive Sidebar**: Mobile-friendly sidebar navigation
- **Navigation Logic**: Home redirects to index.html if logged out; logout button only visible when logged in
- **Ingredient-Based Search**: Find recipes using Spoonacular API by selecting ingredients
- **Consistent UI/UX**: Shared navigation, sidebar, and modal logic via `common.js`

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Spoonacular API** - Ingredient-based recipe search

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Client-side functionality
- **Fetch API** - HTTP requests
- **common.js** - Shared navigation, sidebar, and search modal logic

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account (or local MongoDB)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/meawsin/What-Can-I-Cook.git
   cd What-Can-I-Cook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3000
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

   **Important Notes:**
   - Replace `your_username`, `your_password`, `your_cluster`, and `your_database` with your actual MongoDB Atlas credentials
   - Generate a strong random string for `JWT_SECRET`
   - Add your Spoonacular API key for ingredient-based search
   - If you don't have a `.env` file, the app will use fallback values for development

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
What-Can-I-Cook/
├── controllers/          # Route handlers
│   ├── userController.js
│   └── recipeController.js
├── Frontend/            # Frontend files
│   ├── images/          # Static images
│   ├── *.html           # HTML pages
│   └── common.js        # Shared frontend logic
├── middleware/          # Custom middleware
│   └── authMiddleware.js
├── models/             # Database models
│   ├── userModel.js
│   └── recipeModel.js
├── routes/             # API routes
│   ├── userRoutes.js
│   └── recipeRoutes.js
├── uploads/            # Uploaded images (auto-created)
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
  - **Body:** `{ fullName, username, email, password, dietaryPreference, allergies, favoriteMeal }`
  - **Response:** `{ token, user }`
- `POST /api/users/login` - Login user
  - **Body:** `{ email, password }`
  - **Response:** `{ token, user }`

### User Profile
- `GET /api/users/profile` - Get user profile (Protected, Bearer token)
  - **Response:** `{ fullName, username, email, dietaryPreference, allergies, favoriteMeal }`
- `PUT /api/users/profile` - Update user profile (Protected)
  - **Body:** `{ fullName, dietaryPreference, allergies, favoriteMeal }`
  - **Response:** `{ user }`

### Favorites
- `GET /api/users/favorites` - Get user's favorite recipes (Protected)
  - **Response:** `[recipe, ...]`
- `PUT /api/users/favorites/:recipeId` - Toggle favorite recipe (Protected)
  - **Response:** `{ favorites }`

### Recipes
- `GET /api/recipes` - Get all recipes (Public)
  - **Query:** `?search=...&ingredients=...`
  - **Response:** `[recipe, ...]`
- `POST /api/recipes` - Create a new recipe (Protected)
  - **Body:** `{ title, description, ingredients, instructions, mealType, cuisine, image }`
  - **Response:** `{ recipe }`

### File Upload
- `POST /api/upload-image` - Upload recipe image (Protected, multipart/form-data)
  - **Response:** `{ imageUrl }`

### Ingredient-Based Search (Spoonacular)
- `POST /api/ingredients/search` - Get recipes by selected ingredients (Protected)
  - **Body:** `{ ingredients: ["egg", "milk"] }`
  - **Response:** `[ { title, image, instructions, ingredients }, ... ]`
  - **Note:** Uses Spoonacular API under the hood

### Error Handling
- All endpoints return appropriate HTTP status codes and error messages in `{ error: "..." }` format.
- 401 Unauthorized for missing/invalid tokens, 400 Bad Request for invalid input, 404 Not Found, etc.

## Access Control

- **Public Pages:**
  - `index.html`, `about.html`, `recipes.html` (view only)
- **Authenticated Pages:**
  - `home.html`, `user.html`, `favourites.html`, `ingredients.html`, `upload.html`, `edit_profile.html`
- **Navigation Logic:**
  - Clicking "Home" when logged out redirects to `index.html`
  - Logout button is only visible when logged in
  - Add Recipe, Favourites, and Profile pages require authentication

## Frontend Utilities

- **common.js**: Handles navigation logic, sidebar toggling, and search modal functionality. Ensures consistent UI/UX across all pages.
- **Live Search Modal**: Accessible from the navbar/sidebar on all main pages (except login, signup, index). Allows searching recipes by name or ingredient.
- **Responsive Sidebar**: Mobile-friendly navigation for authenticated users.

## Limitations / Known Issues

- No user profile picture/avatar support
- No comments or reviews on recipes
- No admin/moderation features
- No dark mode toggle
- No pagination/infinite scroll for large recipe lists
- No social sharing or notifications
- No automated tests (unit/integration)
- Accessibility (A11y) could be improved further
- No deployment instructions for production (only local dev covered)

## Deployment (Optional)

To deploy on a platform like Heroku, Render, or Vercel:
- Set environment variables in the platform's dashboard
- Use `npm run build` if you add a frontend build step
- Make sure uploads/ directory is writable or use a cloud storage solution
- Update CORS settings if needed

## Usage

1. **Registration**: Create a new account with your details and dietary preferences
2. **Login**: Sign in with your credentials
3. **Browse Recipes**: Explore recipes by meal type or search by ingredients
4. **Save Favorites**: Click the heart icon to save recipes to your favorites
5. **Upload Recipes**: Share your own recipes with the community (including real images!)
6. **Filter & Search**: Use the search and filter options to find specific recipes
7. **Ingredient-Based Search**: Use the Ingredients page to find recipes using Spoonacular API

## Troubleshooting

### Common Issues:

1. **"JWT_SECRET must have a value" error**
   - Solution: Create a `.env` file with a JWT_SECRET value
   - The app will use a fallback secret for development if not provided

2. **"Failed to connect to MongoDB" error**
   - Solution: Check your MONGO_URI in the `.env` file
   - Ensure your MongoDB Atlas cluster is running and accessible

3. **"Port already in use" error**
   - Solution: Change the PORT in your `.env` file or kill the process using the current port

4. **Image upload not working**
   - Solution: Ensure the `uploads/` directory exists (it's created automatically)
   - Check that the file is an image and under 5MB

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Authors

- **Mohsin** - *Initial work* - [meawsin](https://github.com/meawsin)

## Acknowledgments

- Tailwind CSS for the beautiful UI components
- MongoDB Atlas for the database hosting
- Express.js community for the excellent documentation
- Spoonacular for the ingredient-based recipe API

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team. 