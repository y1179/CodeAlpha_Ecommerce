# Frosty Bliss - E-Commerce Website

Frosty Bliss is a basic e-commerce web application developed as part of my **CodeAlpha Internship**. The project allows users to browse products, view product details, add products to a cart, create an account, log in, and place orders.

The project was built to practice frontend development, backend APIs, authentication, database operations, and connecting a JavaScript frontend with an Express.js backend.

## Features

* User registration and login
* Product listing
* Product details page
* Add products to cart
* Update cart quantity
* Remove products from cart
* Checkout and order processing
* MongoDB database
* Password hashing
* JWT-based authentication
* REST API integration
* Responsive basic UI

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

## Project Structure

```text
CodeAlpha_Ecommerce/
│
├── frontend/
│   └── html/
│       ├── index.html
│       ├── product.html
│       ├── cart.html
│       ├── checkout.html
│       ├── login.html
│       ├── register.html
│       ├── style.css
│       │
│       ├── js/
│       │   ├── auth.js
│       │   ├── products.js
│       │   ├── product.js
│       │   ├── cart.js
│       │   └── checkout.js
│       │
│       └── images/
│
└── backend/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── config/
    ├── middleware/
    ├── server.js
    ├── .env
    └── package.json
```

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/CodeAlpha_Ecommerce.git
```

### 2. Open the backend folder

```bash
cd CodeAlpha_Ecommerce/backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

Replace the values with your own MongoDB connection string and secret key.

### 5. Start the backend

```bash
node server.js
```

The server will run on:

```text
http://localhost:5000
```

### 6. Run the frontend

Open the frontend using **VS Code Live Server**.

## Database

MongoDB Atlas is used to store application data such as:

* Users
* Products
* Orders

## Learning Outcomes

Through this project, I practiced:

* Building a frontend using HTML, CSS and JavaScript
* Creating REST APIs using Express.js
* Connecting Node.js with MongoDB
* Implementing user authentication
* Working with CRUD operations
* Managing shopping cart functionality
* Connecting frontend APIs with backend services

## Internship

This project was completed as part of my **CodeAlpha Internship**.

## Author

**Yas Patle**

B.Tech Computer Science & Engineering Graduate

GitHub: https://github.com/YOUR_USERNAME

LinkedIn: https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/

````

---

# 2. `CodeAlpha_SocialMedia` — README

# SocialHub - Social Media Platform

SocialHub is a basic social media web application developed as part of my **CodeAlpha Internship**.

The application allows users to register and log in, create posts, view posts, like posts, comment on posts, view user profiles, and follow or unfollow other users.

The project was created to practice full-stack web development using JavaScript, Express.js, MongoDB, REST APIs, authentication, and database relationships.

## Features

- User registration
- User login
- JWT authentication
- User profiles
- Create posts
- View posts
- Like and unlike posts
- Add comments
- View post details
- Follow and unfollow users
- Followers and following counts
- Display user's posts
- MongoDB database integration

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
CodeAlpha_SocialMedia/
│
├── frontend/
│   ├── html/
│   │   ├── index.html
│   │   ├── profile.html
│   │   ├── post.html
│   │   ├── login.html
│   │   ├── register.html
│   │   └── style.css
│   │
│   └── js/
│       ├── auth.js
│       ├── posts.js
│       ├── profile.js
│       └── post.js
│
└── backend/
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── postController.js
    │   ├── commentController.js
    │   └── userController.js
    │
    ├── middleware/
    │   └── authMiddleware.js
    │
    ├── models/
    │   ├── User.js
    │   ├── Post.js
    │   └── Comment.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   ├── postRoutes.js
    │   ├── commentRoutes.js
    │   └── userRoutes.js
    │
    ├── .env
    ├── server.js
    └── package.json
````

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/CodeAlpha_SocialMedia.git
```

### 2. Open the backend folder

```bash
cd CodeAlpha_SocialMedia/backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

Replace the values with your own MongoDB connection string and secret key.

### 5. Start the backend

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### 6. Run the frontend

Open the `frontend/html/index.html` file using **VS Code Live Server**.

The frontend communicates with the Express.js backend through REST APIs.

## API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Posts

```text
GET  /api/posts
GET  /api/posts/:id
POST /api/posts
POST /api/posts/:id/like
```

### Comments

```text
GET  /api/comments/:id/comments
POST /api/comments/:id/comments
```

### Users

```text
GET  /api/users/:id
GET  /api/users/:id/posts
POST /api/users/:id/follow
```

## Database

MongoDB Atlas is used for storing:

* Users
* Posts
* Comments
* Followers
* Following relationships
* Post likes

## Authentication

The application uses:

* bcryptjs for password hashing
* JSON Web Tokens (JWT) for authentication
* Authorization headers for protected API requests

Example:

```text
Authorization: Bearer <token>
```

## Learning Outcomes

Through this project, I practiced:

* Building a full-stack web application
* Creating REST APIs with Express.js
* Working with MongoDB and Mongoose
* Implementing JWT authentication
* Creating and managing user profiles
* Implementing likes and comments
* Implementing follow and unfollow functionality
* Connecting frontend JavaScript with backend APIs
* Handling protected routes

## Internship

This project was completed as part of my **CodeAlpha Internship**.

## Author

**Yas Patle**

B.Tech Computer Science & Engineering Graduate

GitHub: https://github.com/YOUR_USERNAME

LinkedIn: https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/

````

### Before pushing

For **both repositories**, change:

```text
YOUR_USERNAME
````

to your actual GitHub username.

Also, don't put your real `.env` contents in GitHub. Your `.gitignore` should contain:

```text
node_modules/
.env
```

**One more recommendation:** add screenshots of your finished projects to each README. That makes the repositories much easier for a recruiter or CodeAlpha reviewer to understand quickly.
