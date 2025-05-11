import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const AdminReports = () => {
    const [loading, setLoading] = useState(false);

    const generateReport = async (type) => {
        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/api/reports/generate/${type}`, {
                responseType: 'blob', // Ensure we get a file
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `LeafySpot_${type}_Report.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success(`${type} report downloaded successfully`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate report");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Generate Reports</h2>
            <div className="flex gap-4">
                <button className="bg-blue-500 text-white px-4 py-2" onClick={() => generateReport('weekly')} disabled={loading}>
                    Weekly Report
                </button>
                <button className="bg-green-500 text-white px-4 py-2" onClick={() => generateReport('monthly')} disabled={loading}>
                    Monthly Report
                </button>
                <button className="bg-purple-500 text-white px-4 py-2" onClick={() => generateReport('yearly')} disabled={loading}>
                    Yearly Report
                </button>
            </div>
        </div>
    );
};

export default AdminReports;
