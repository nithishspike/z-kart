export default function transformData(data) {
    console.log("transforming data is ",data);
    
    const transformedData = data.reduce((acc, current) => {
        const { totalAmount,product,discount,discountId,createdTime, paymentMode,shippingAddress,invoiceId, invoiceNumber, invoiceItems,user} = current;
        
        const existingInvoice = acc.find(invoice => invoice.invoiceId === invoiceId);
        if (existingInvoice) {
            // Add invoice item to existing invoice
            existingInvoice.invoice_items.push({
                price: invoiceItems ? invoiceItems.price : null,
                productId: invoiceItems ? invoiceItems.productId : null,
                quantity: invoiceItems ? invoiceItems.quantity : null,
                productName: product ? product.productName : null,
                specification: product ? product.specification : null,
            });
        } else {
            acc.push({
                invoiceId: invoiceId,
                paymentMode: paymentMode,
                invoiceNumber: invoiceNumber,
                discountCode:discount ? discount.discountCode :null,
                totalAmount:totalAmount,
                percentage:discount? discount.percentage :null,
                shippingAddress:shippingAddress,
                transactionTime:createdTime,
                name:user ? user.firstName+user.lastName :null,
                invoice_items: [
                    {
                        price: invoiceItems ? invoiceItems.price :null,
                        productId: invoiceItems ? invoiceItems.productId :null,
                        quantity: invoiceItems ? invoiceItems.quantity :null,
                        productName:product ? product.productName :null,
                        specification:product ? product.specification :null,
                    },
                ],
            });
        }
        return acc;
    }, []);

    return transformedData; 
}
