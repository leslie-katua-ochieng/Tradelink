'use client'
import React, { useState, useEffect } from "react";
import { getOrder } from "."; // Assuming getOrder is a function to fetch order data from the backend API
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

const OrderDetail: React.FC<Props> = ({ searchParams }: Props) => {
    const _idString = searchParams?._id;
    const _id = String(_idString);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const fetchedOrder = await getOrder(_id);
                setOrder(fetchedOrder);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching order:", error);
                setError("Error fetching order. Please try again.");
                setLoading(false);
            }
        };

        fetchOrder();
    }, [_id]);

    return (
        <div className="flex-1 space-y-4 p-8 pt-6 ml-64">
            <h2 className="text-3xl font-bold tracking-tight">Order Details</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {order && (
                <Table className="text-xl">
                    <TableHeader>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{order.firstName}, {order.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{order.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>{order.phoneNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>{order.address}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Kes {order.totalPrice}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Items</TableCell>
                            <TableCell>
                                <ul>
                                    {order.cart.map((item: any) => (
                                        <li key={item._id}>
                                            {item.name} - KES {item.price}
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Order Status</TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Order Date</TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
                
            )}
        </div>
    );
}

export default OrderDetail;