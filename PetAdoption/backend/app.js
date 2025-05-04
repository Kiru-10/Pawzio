import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import petRoutes from './routes/petRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import speciesRoutes from './routes/speciesRoutes.js';
import personalitiesRoutes from './routes/personalitiesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import userRoutes from './routes/userRoutes.js';
import countRoutes from './routes/countRoutes.js';
import adoptedRoutes from './routes/adoptedRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
  }));
app.use(express.json());

app.use(cookieParser());

// Routes
app.use('/pets', petRoutes);
app.use('/species', speciesRoutes);
app.use('/personalities', personalitiesRoutes);
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/user', userRoutes);
app.use('/counts', countRoutes);
app.use('/adopted', adoptedRoutes);
app.use('/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Error handling
app.use(errorHandler);

export default app;