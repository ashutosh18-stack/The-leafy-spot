import express from 'express';
import { generateInvoice } from '../controllers/invoiceController.js';

const router = express.Router();

router.get('/download-invoice/:orderId', generateInvoice);

export default router; // ✅ Use default export
