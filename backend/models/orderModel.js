import mongoose from 'mongoose';

// Function to generate a custom Order ID
const generateOrderId = () => {
    const prefix = "LS"; // Fixed prefix for Leafy Spot
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
    return `${prefix}${randomNumber}`;
};

// Order Schema with custom orderId
const orderSchema = new mongoose.Schema({
    _id: { type: String, default: generateOrderId, unique: true }, // Use `orderId` as the unique ID
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'Order Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true, default: Date.now }, // Store as Date type
    time: { type: Date, required: true, default: Date.now } // Add time field
}, { _id: false }); // Disable default _id

// Model creation
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
