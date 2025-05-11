    import React, { useState } from 'react';
    import { downloadInvoice } from '../services/invoiceService';

    const InvoiceButton = ({ orderDetails }) => {
        const [loading, setLoading] = useState(false);

        const handleDownload = async () => {
            setLoading(true);
            try {
                const response = await downloadInvoice(orderDetails);
                // Open the invoice PDF in a new tab for download
                window.open(response.data.filePath, '_blank');
            } catch (error) {
                console.error('Error generating invoice', error);
            }
            setLoading(false);
        };

        return (
            <button onClick={handleDownload} disabled={loading}>
                {loading ? 'Generating Invoice...' : 'Download Invoice'}
            </button>
        );
    };

    export default InvoiceButton;
