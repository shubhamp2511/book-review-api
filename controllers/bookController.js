const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const query = {};
  if (author) query.author = new RegExp(author, 'i');
  if (genre) query.genre = genre;

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const reviews = await Review.find({ book: book._id });
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  res.json({ book, averageRating, reviews });
};

exports.searchBooks = async (req, res) => {
  const { title, author } = req.query;
  const query = {};
  if (title) query.title = new RegExp(title, 'i');
  if (author) query.author = new RegExp(author, 'i');

  const books = await Book.find(query);
  res.json(books);
};