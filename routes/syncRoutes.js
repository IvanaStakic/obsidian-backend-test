import express from 'express';
import { syncProducts } from '../controllers/syncController.js';

const router = express.Router();

router.post('/', syncProducts);

export default router;
