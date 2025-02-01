import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';
import officeRoutes from './routes/officeRoutes.js';
import seatRoutes from './routes/seatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoute.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/offices', officeRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/employees', employeeRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;