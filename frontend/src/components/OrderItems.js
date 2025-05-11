import React from 'react';
import { downloadInvoice } from '../api/orderAPI';

const OrderItem = ({ order }) => {
    return (
        <div className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.amount}</p>
            
            {/* ✅ Download Invoice Button */}
            {order.invoiceUrl && (
                <button className="invoice-btn" onClick={() => downloadInvoice(order._id)}>
                    Download Invoice
                </button>
            )}
        </div>
    );
};

export default OrderItem;
