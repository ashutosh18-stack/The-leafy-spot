import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['orderId'] = order._id; // Add order ID to each item
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error loading order data:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const handleInvoiceDownload = async (orderId) => {
    try {
      const response = await axios.get(`${backendUrl}/api/invoices/download-invoice/${orderId}`, { responseType: 'blob' });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', `invoice_${orderId}.pdf`);
      document.body.appendChild(fileLink);
      fileLink.click();
    } catch (error) {
      console.error('Error downloading the invoice:', error);
    }
  };

  return (
    <div className='border-t pt-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Title Section */}
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* Orders List */}
      <div>
        {orderData.map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            {/* Order Details */}
            <div className='flex items-start gap-6 text-sm'>
              {/* ✅ Fix: Check if `item.image` exists before accessing `[0]` */}
              <img 
                className='w-16 sm:w-20' 
                src={item.image && item.image.length > 0 ? item.image[0] : 'https://via.placeholder.com/150'} 
                alt="Product"
              />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>{currency}{item.price}</p>
                 
                 
                </div>
                <p className='mt-1'>
                  Date & Time: <span className='text-gray-400'>{new Date(item.date).toLocaleString()}</span>
                </p>
                <p className='mt-1'>
                  Payment: <span className='text-gray-400'>{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Order Status and Invoice Button */}
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button
                onClick={() => handleInvoiceDownload(item.orderId)}
                className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100'
              >
                View Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
