import axios from 'axios';

export const downloadInvoice = async (orderDetails) => {
    const response = await axios.post('/api/invoices/generate-invoice', { orderDetails });
    return response;
};
