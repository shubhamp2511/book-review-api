const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const existing = await Review.findOne({ user: req.user.id, book: req.params.id });
  if (existing) return res.status(400).json({ message: 'Review already exists' });

  const review = new Review({
    user: req.user.id,
    book: req.params.id,
    rating: req.body.rating,
    comment: req.body.comment
  });
  await review.save();
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id, user: req.user.id });
  if (!review) return res.status(403).json({ message: 'Not allowed' });

  review.rating = req.body.rating;
  review.comment = req.body.comment;
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!review) return res.status(403).json({ message: 'Not allowed' });
  res.json({ message: 'Review deleted' });
};
