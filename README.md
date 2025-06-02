# 📚 Book Review API

A RESTful API built using **Node.js**, **Express.js**, **MongoDB**, and **JWT** for managing books and user reviews.

---

## 🚀 Features
- User Signup and Login with JWT Authentication
- Add, View, and Search Books
- Submit, Update, and Delete Book Reviews
- Pagination and Filter support

---

## 🛠️ Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- dotenv for environment variables

---

## 📦 Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd book-review-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/bookdb
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 4. Run the Server
```bash
node server.js
```

Server will be running at: `http://localhost:3000`

---

## 🧩 Database Schema Design

### User
```js
{
  name: String,
  email: { type: String, unique: true },
  password: String
}
```

### Book
```js
{
  title: String,
  author: String,
  genre: String
}
```

### Review
```js
{
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String
}
```

> Note: Each user can leave only one review per book.

---

## 📚 API Endpoints

### 🔐 Auth
- `POST /api/signup` – Register new user
- `POST /api/login` – Login and get token

### 📘 Books
- `POST /api/books` – Add new book (Auth required)
- `GET /api/books` – List books with filters and pagination
- `GET /api/books/:id` – Get book details by ID with reviews and average rating
- `GET /api/search?title=abc&author=xyz` – Search by title or author

### ✍️ Reviews
- `POST /api/books/:id/reviews` – Add review (Auth required)
- `PUT /api/reviews/:id` – Update your review
- `DELETE /api/reviews/:id` – Delete your review

---

## 🧠 Sample Requests (with curl)

### Signup
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "password": "123456"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "123456"}'
```

### Add Book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "The Alchemist", "author": "Paulo Coelho", "genre": "Fiction"}'
```

### Search Books
```bash
curl http://localhost:3000/api/search?title=alchemist
```

### Submit Review
```bash
curl -X POST http://localhost:3000/api/books/<book_id>/reviews \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Great read!"}'
```

---

## 🗒️ Notes
- Only one review per user per book is allowed.
- All protected routes require a valid JWT token in the `Authorization` header.
- Ratings are averaged from all reviews per book.

---

## 🧰 Folder Structure
```
book-review-api/
├── config/          # DB connection
├── controllers/     # Logic for auth, books, reviews
├── models/          # Mongoose schemas
├── routes/          # API endpoints
├── middlewares/     # JWT auth middleware
├── server.js        # App entry point
├── .env             # Environment config
└── README.md        # Project documentation
```

---

## 📄 License
MIT
