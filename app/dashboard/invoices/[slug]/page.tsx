'use client'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getOrder } from '.';

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const PDF: React.FC<Props> = ({ searchParams }: Props) =>{
    const _idString = searchParams?._id;
    const [invoiceNumber, setInvoiceNumber] = useState<number>(1000);
    const _id = String(_idString);
    const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    // Fetch invoice data from API
    const fetchInvoice = async () => {
      try {
        const fetchInvoice = await getOrder(_id);
        setInvoice(fetchInvoice);
        generateInvoiceNumber();
        // console.log(fetchInvoice)
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    // Change '1' to the desired invoice ID
    fetchInvoice();
  }, [_id]);
  const generateInvoiceNumber = () => {
    // Increment the invoice number
    setInvoiceNumber((prevNumber) => prevNumber + 1);
  };

  const printDocument = async () => {
    const input = document.getElementsByClassName('invoicePages')[0] as HTMLElement;
    const pdf = new jsPDF();

    html2canvas(input).then((canvas) => {
      console.log(canvas);
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.save('download.pdf');
    });
  };

  return (
    <div className='p-4'>
      <div style={{}}>
        <Button onClick={() => printDocument()}>Print</Button>
      </div>

      {/* Render invoice page */}
      {invoice && (
        <div className="invoicePages p-24" style={pageStyle}>
          {/* Render invoice details */}
          
          <h2 className="text-3xl font-bold tracking-tight text-end">Invoice #{invoiceNumber}</h2>
          <div className="flex justify-between">
            <div className="mt-5 mt-md-0">
                <p className="text-primary font-bold">Invoice To</p>
                <h4 className='font-bold tracking-tight'>{invoice.firstName}, {invoice.lastName}</h4>
                <ul className="list-unstyled font-bold">
                    <li>{invoice.phoneNumber}</li>
                    <li>{invoice.email}</li>
                    <li>{invoice.address}</li>
                </ul>
            </div>
            <div className="mt-5 mt-md-0">
                    <p className="text-primary font-bold">Invoice From</p>
                    <h4 className='font-bold'>Tradelink</h4>
                    <ul className="list-unstyled font-bold">
                        <li>+254-72727272</li>
                        <li>info@tradelink.com</li>
                        <li>Nairobi, GPO</li>
                    </ul>
                </div>
            </div>
            <div className='mt-10'>
            {/* Render cart items */}
            <table className="w-full border-collapse border border-gray-200 my-5">
                <thead>
                    <tr className="bg-primary-subtle">
                        <th className="border border-gray-300 px-4 py-2">Item</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.cart.map((item: any, itemIndex: number) => (
                    <tr key={itemIndex}>
                        <td className="border border-gray-300 px-4 py-2 font-bold">{item.name}</td>
                        <td className="border border-gray-300 px-4 py-2 font-bold">Kes {item.price}</td>
                    </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td className="border border-gray-300 px-4 py-2 font-bold">Total Price: Kes {invoice.totalPrice}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div className="flex justify-between my-5">
                <div>
                    <h5 className="font-bold my-4">Contact Us</h5>
                    <ul className="list-none font-bold">
                    <li className="flex items-center mb-2">
                        <span className="text-primary fs-5 me-2">
                        <i className="mdi mdi-map-marker"></i>
                        </span>
                        Tradelink
                    </li>
                    <li className="flex items-center mb-2">
                        <span className="text-primary fs-5 me-2">
                        <i className="mdi mdi-phone"></i>
                        </span>
                        +254 72398132
                    </li>
                    <li className="flex items-center mb-2">
                        <span className="text-primary fs-5 me-2">
                        <i className="mdi mdi-email"></i>
                        </span>
                        info@tradelink.com
                    </li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold my-4">Payment Info</h5>
                    <ul className="list-none font-bold">
                    <li>
                        <span className="font-semibold">Account No:</span> 102 3345 56938
                    </li>
                    <li>
                        <span className="font-semibold">Account Name:</span> John Doe
                    </li>
                    <li>
                        <span className="font-semibold">Branch Name:</span> Nairobi
                    </li>
                    </ul>
                </div>
                </div>

                <div className="text-center my-5 text-black border-t relative">
                    <p className="text-black">
                        <span className="font-semibold">NOTICE: </span> A finance charge of 1.5% will be made on unpaid balances after 30 days.
                    </p>
                </div>
            
          </div>
        
      )}
    </div>
  );
};

const pageStyle = {
  backgroundColor: '#FFFDD0',
  width: '210mm',
  minHeight: '297mm',
  marginLeft: 'auto',
  marginRight: 'auto',
};

export default PDF;