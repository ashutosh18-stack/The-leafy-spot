import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const InvoicePage = () => {
    const { orderId } = useParams();
    const { downloadInvoice } = useContext(ShopContext);

    useEffect(() => {
        if (orderId) {
            downloadInvoice(orderId);
        }
    }, [orderId]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg font-medium">Downloading invoice...</p>
        </div>
    );
};

export default InvoicePage;
