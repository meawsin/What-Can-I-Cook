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

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Client-side functionality
- **Fetch API** - HTTP requests

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
   ```

   **Important Notes:**
   - Replace `your_username`, `your_password`, `your_cluster`, and `your_database` with your actual MongoDB Atlas credentials
   - Generate a strong random string for `JWT_SECRET` (you can use an online generator or run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
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
- `POST /api/users/login` - Login user

### User Profile
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Favorites
- `GET /api/users/favorites` - Get user's favorite recipes (Protected)
- `PUT /api/users/favorites/:recipeId` - Toggle favorite recipe (Protected)

### Recipes
- `GET /api/recipes` - Get all recipes (Public)
- `POST /api/recipes` - Create a new recipe (Protected)

### File Upload
- `POST /api/upload-image` - Upload recipe image (Protected)

## Usage

1. **Registration**: Create a new account with your details and dietary preferences
2. **Login**: Sign in with your credentials
3. **Browse Recipes**: Explore recipes by meal type or search by ingredients
4. **Save Favorites**: Click the heart icon to save recipes to your favorites
5. **Upload Recipes**: Share your own recipes with the community (including real images!)
6. **Filter & Search**: Use the search and filter options to find specific recipes

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

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team. 