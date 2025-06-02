const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
