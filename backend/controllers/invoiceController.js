import PDFDocument from 'pdfkit';
import orderModel from '../models/orderModel.js';

export const generateInvoice = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Fetch order details
        const order = await orderModel.findById(orderId).populate('userId');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Get order details and shipping cost
        const shippingCost = order.shippingCost || 0;  // Assuming you store the shipping cost in your order model
        const orderDetails = {
            orderId: order._id,
            customerName: `${order.address.firstName} ${order.address.lastName}`,
            email: order.address.email,
            shippingAddress: `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}`,
            paymentMethod: order.paymentMethod,
            paymentStatus: order.payment ? 'Paid' : 'Pending',
            items: order.items.map(item => ({
                product: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price
            })),
            totalAmount: order.amount,
            orderDate: order.date.toLocaleDateString(),
            orderTime: order.time.toLocaleTimeString(),
            shippingCost: shippingCost,
            totalWithShipping: order.amount + shippingCost  // Add shipping cost to the total amount
        };

        // Create a new PDF document
        const doc = new PDFDocument({ margin: 50 });

        // Set the response header to send the PDF file as an attachment
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice_${orderId}.pdf`);

        // Pipe the PDF document directly to the response
        doc.pipe(res);

        // Add title
        doc.fontSize(24).text('Invoice', { align: 'center' });
        doc.moveDown(1);

        // Add Order Details Section
        doc.fontSize(12)
            .text(`Order ID: ${orderDetails.orderId}`, { align: 'left' })
            .text(`Date: ${orderDetails.orderDate}`, { align: 'left' })
            .text(`Time: ${orderDetails.orderTime}`, { align: 'left' })
            .text(`Customer Name: ${orderDetails.customerName}`, { align: 'left' })
            .text(`Email: ${orderDetails.email}`, { align: 'left' })
            .text(`Shipping Address: ${orderDetails.shippingAddress}`, { align: 'left' });

        // Add a line separator
        doc.moveDown().lineWidth(1).moveTo(50, doc.y).lineTo(600, doc.y).stroke();

        // Add Items Table Title
        doc.moveDown().fontSize(16).text('Items:', { underline: true, align: 'left' });

        // Table Header (Proper Table Layout)
        doc.fontSize(12)
            .text('Product', 50, doc.y, { width: 180, align: 'left', continued: true })
            .text('Quantity', 230, doc.y, { width: 80, align: 'right', continued: true })
            .text('Price', 320, doc.y, { width: 80, align: 'right', continued: true })
            .text('Total', 400, doc.y, { width: 100, align: 'right' });

        // Add table separator
        doc.moveDown().lineWidth(1).moveTo(50, doc.y).lineTo(600, doc.y).stroke();

        // Add items to the table with proper padding
        orderDetails.items.forEach(item => {
            doc.text(item.product, 50, doc.y, { width: 180, align: 'left', continued: true })
                .text(item.quantity.toString(), 230, doc.y, { width: 100, align: 'right', continued: true })
                .text(`Rs ${item.price}`, 320, doc.y, { width: 100, align: 'right', continued: true })
                .text(`Rs ${item.total}`, 400, doc.y, { width: 100, align: 'right' });

            doc.moveDown(0.5); // Adding spacing between rows
        });

        // Add the shipping cost (right-aligned)
        doc.moveDown(2).fontSize(14).text(`Shipping Cost: Rs 10`, { align: 'right' });

        // Add the total amount (right-aligned)
        doc.moveDown(2).fontSize(14).text(`Total Amount With GST: Rs ${orderDetails.totalAmount}`, { align: 'right' });

        // Add the total amount with shipping (right-aligned)
        doc.moveDown(2).fontSize(16).text(`Total (Including Shipping): Rs ${orderDetails.totalWithShipping}`, { align: 'right' });

        // Add Payment Details (center-aligned)
        doc.moveDown(2).fontSize(12).text(`Payment Method: ${orderDetails.paymentMethod}`, { align: 'center' });
        doc.text(`Payment Status: ${orderDetails.paymentStatus}`, { align: 'center' });

        // Footer (center-aligned)
        doc.moveDown(2).fontSize(10).text('Thank you for shopping with us!', { align: 'center' });

        // Finalize the PDF
        doc.end();

    } catch (error) {
        console.error('Error generating invoice:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while generating the invoice',
            error: error.message,
        });
    }
};
