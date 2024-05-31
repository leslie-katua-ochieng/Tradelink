'use client'
import React, { useState, useEffect } from "react";
import { getOrder } from "."; // Assuming getOrder is a function to fetch order data from the backend API
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

const UpdateStatus: React.FC<Props> = ({ searchParams }: Props) => {
    const _idString = searchParams?._id;
    const _id = String(_idString);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

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

    const updateOrderStatus = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/checkout/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            setOrder((prevOrder: any) => ({
                ...prevOrder,
                status: status
            }));
            setLoading(false);
        } catch (error) {
            console.error("Error updating order status:", error);
            setError("Error updating order status. Please try again.");
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!status) {
            setError("Please select a status");
            return;
        }
        await updateOrderStatus();
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6 ml-64">
            {order && (
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Update Order Status</h2>
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
                            <TableCell>Order Status</TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
                    <form onSubmit={handleSubmit}>
                        <div className="text-xl mt-8 mb-4">
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Status"}
                        </Button>
                        {error && <p>{error}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default UpdateStatus;