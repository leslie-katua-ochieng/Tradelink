'use client'
import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Page() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(`${apiUrl}/checkout`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                // Filter orders with status 'completed'
                const completedOrders = data.filter((order: { status: string; }) => order.status === 'completed');
                setOrders(completedOrders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex-1 space-y-4 p-8 pt-6 ml-64">
            <h2 className="text-3xl font-bold tracking-tight">Invoice</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <DataTable columns={columns} data={orders} />
                </div>
            )}
        </div>
    );
}