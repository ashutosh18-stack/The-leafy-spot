import Order from '../models/orderModel.js';

// 📌 Function to get date range based on the type
const getDateRange = (filterType) => {
    const now = new Date();
    let startDate, endDate = now;

    if (filterType === 'weekly') {
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
    } else if (filterType === 'monthly') {
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1);
    } else if (filterType === 'yearly') {
        startDate = new Date();
        startDate.setFullYear(now.getFullYear() - 1);
    }

    return { startDate, endDate };
};

// 📌 Fetch orders based on type (weekly, monthly, yearly)
export const generateReport = async (req, res) => {
    try {
        const { type } = req.params;  
        const { startDate, endDate } = getDateRange(type);

        // 🔍 Fetch orders within the date range
        const orders = await Order.find({ date: { $gte: startDate, $lte: endDate } });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this period." });
        }

        // 📤 Return orders as JSON
        res.status(200).json({ success: true, data: orders });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching report" });
    }
};
