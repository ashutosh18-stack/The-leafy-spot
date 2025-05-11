import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import invoiceRouter from './routes/invoiceRoute.js';
import reportRouter from './routes/reportRoute.js'; // ✅ Import Report Routes

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to Database & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/invoices', invoiceRouter);
app.use('/api/reports', reportRouter); // ✅ Ensure reports route is added

// Test API Route
app.get('/', (req, res) => {
    res.status(200).send("API Working");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start the Server
app.listen(port, () => console.log(`🚀 Server started on PORT: ${port}`));
