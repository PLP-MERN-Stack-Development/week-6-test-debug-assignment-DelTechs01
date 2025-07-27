import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console()
  ]
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

// Global error handler
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(5000, () => {
      console.log('Server running on port 5000');
      logger.info('Server started successfully');
    });
  })
  .catch(err => {
    logger.error('Database connection error:', err);
  });

export default app;