import React, { useState } from 'react';
import axios from 'axios';

const Reports = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState('weekly');

    // ✅ Function to fetch report data
    const generateReport = async (type) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/reports/orders/${type}`); // ✅ Correct API URL
            setReportData(response.data.data);
        } catch (error) {
            console.error("❌ Error fetching report:", error);
            setReportData([]); // Reset on error
        }
        setLoading(false);
    };

    // ✅ Calculate total sales
    const totalSales = reportData.reduce((sum, order) => sum + order.amount, 0);

    return (
        <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">Order Reports</h2>

            {/* Report Selection Buttons */}
            <div className="flex gap-4 mb-4">
                <button className={`px-4 py-2 ${selectedType === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => { setSelectedType('weekly'); generateReport('weekly'); }}>
                    Weekly Report
                </button>
                <button className={`px-4 py-2 ${selectedType === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => { setSelectedType('monthly'); generateReport('monthly'); }}>
                    Monthly Report
                </button>
                <button className={`px-4 py-2 ${selectedType === 'yearly' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => { setSelectedType('yearly'); generateReport('yearly'); }}>
                    Yearly Report
                </button>
            </div>

            {/* Loading State */}
            {loading && <p className="text-gray-500">Loading...</p>}

            {/* Order Report Table */}
            {reportData.length > 0 ? (
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Order ID</th>
                          
                            <th className="border px-4 py-2">Payment Method</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Date & Time</th>
                              <th className="border px-4 py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map(order => (
                            <tr key={order._id} className="text-center">
                                <td className="border px-4 py-2">{order._id}</td>
                             
                                <td className="border px-4 py-2">{order.paymentMethod}</td>
                                <td className="border px-4 py-2">{order.status}</td>
                                <td className="border px-4 py-2">
                                    {new Date(order.date).toLocaleDateString()} <br />
                                    {new Date(order.date).toLocaleTimeString()} {/* ✅ Display order time */}
                                </td>
                                   <td className="border px-4 py-2">Rs{order.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    {/* ✅ Display total sales at the bottom */}
                    <tfoot>
                        <tr className="bg-gray-100 font-semibold">
                            <td className="border px-4 py-2 text-right" colSpan="4">Total Sales:</td>
                            <td className="border px-4 py-2 text-center">Rs{totalSales.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            ) : (
                <p className="text-gray-500">No data available</p>
            )}
        </div>
    );
};

export default Reports;
