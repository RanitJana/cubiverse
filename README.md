# **Cubiverse**

Welcome to **Cubiverse**, an e-commerce platform dedicated to selling a wide variety of Rubik's cubes and puzzle accessories. Whether you're a seasoned speedcuber or just getting started, Cubiverse has something for everyone.

## Demo

Check out the demo video here: [Watch](https://res.cloudinary.com/db8ksbpjm/video/upload/v1723390170/Cubiverse_nbvmbl.mp4)

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## **Features**

- **Diverse Collection**: Explore a wide range of Rubik's cubes catering to different skill levels.
- **Interactive UI**: Enjoy a dynamic and responsive user interface, powered by React.
- **Secure Authentication**: User data protection with bcrypt and JSON Web Tokens (JWT).
- **Image Management**: Efficient image storage and delivery using Cloudinary.
- **File Uploads**: Handle product image uploads smoothly with Multer.
- **Responsive Carousels**: Browse through interactive product carousels created with Swiper.js.

## **Tech Stack**

### **Frontend:**

- **React**: JavaScript library for building user interfaces.
- **CSS**: Styling for a visually appealing and responsive design.
- **Swiper.js**: JavaScript library for creating touch sliders and carousels.

### **Backend:**

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Web framework for Node.js, handling server-side logic.

### **Database:**

- **MongoDB**: NoSQL database for storing product and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

### **Key Dependencies:**

- **bcrypt**: For hashing passwords securely.
- **cloudinary**: Cloud service for image and video management.
- **jsonwebtoken**: For implementing secure user authentication.
- **multer**: Middleware for handling `multipart/form-data` for file uploads.

## **Installation**

### **Prerequisites:**

- **Node.js** (v14 or later)
- **MongoDB** (local or hosted)
- **npm** (Node package manager)

### **Steps:**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RanitJana/cubiverse.git
   cd cubiverse
   ```

2. **Install dependencies:**

   ```bash
   npm install
   cd client
   npm install
   cd ..
   cd server
   npm install
   cd ..
   ```

3. **Create a `.env` file in the server directory and add your environment variables:**

   ```bash
   PORT="***"
   MONGODB_URI="***"
   ACCESS_TOKEN_SECRET="***"
   ACCESS_TOKEN_EXPIRY="***"
   REFRESH_TOKEN_SECRET="***"
   REFRESH_TOKEN_EXPIRY="***"
   CLOUD_NAME="***"
   API_KEY="***"
   API_SECRECT="***"
   ```

4. **Change api request URI to your backend server** : https://cubiverse-.... to http://localhost:... or another

5. **Run the application:**

   ```bash
   npm start
   ```

6. **Open your browser and visit:**

   ```bash
   http://localhost:5173
   ```

## **Usage**

1. **Browse Products**: Navigate through different categories of Rubik's cubes.
2. **Register/Login**: Create an account or log in to make purchases.
3. **Add to Cart**: Select your desired cubes and add them to your cart.
4. **Checkout**: Complete the purchase (Stripe API integration coming soon).

## **Future Enhancements**

- **Search Functionality**: Allow users to search for specific products easily.
- **Stripe API Integration**: Introduce a secure and seamless payment gateway using Stripe.

## **Contributing**

Contributions are welcome! If you'd like to contribute to Cubiverse, please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:** `git checkout -b feature-branch-name`
3. **Make your changes and commit them:** `git commit -m 'Add some feature'`
4. **Push to the branch:** `git push origin feature-branch-name`
5. **Open a pull request.**

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
