import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import companyProfileRoutes from './routes/companyprofileroutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hiregenix', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));
console.log("JWT_SECRET from env file:", process.env.JWT_SECRET);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', companyProfileRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'HireGenix API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});