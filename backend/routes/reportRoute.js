import express from 'express';
import { generateReport } from '../controllers/reportController.js';

const router = express.Router();

// ✅ Correct Route: `/api/reports/orders/:type`
router.get('/orders/:type', generateReport);

export default router;
