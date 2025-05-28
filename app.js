import express from 'express';
import dotenv from 'dotenv';
import syncRoutes from './routes/syncRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/sync-products', syncRoutes);

export default app;
