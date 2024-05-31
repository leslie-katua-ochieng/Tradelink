'use client'
import { useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Services = {
    _id: string,
    name: string,
    description: string,
    price: number,
    contact: string,
    area: string
}

export const columns: ColumnDef<Services>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "contact",
        header:"Contact"
    },
    {
        accessorKey: "description",
        header:"Description"
    },
    {
        accessorKey: "area",
        header:"Area"
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "KES",
            }).format(price)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const serviceId = row.original._id;
            const [deleting, setDeleting] = useState(false);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

            const handleDelete = async () => {
                try {
                    setDeleting(true);
                    const response = await fetch(`${apiUrl}/${serviceId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete service');
                    }
                    // Optionally update the UI or fetch data again after deletion
                } catch (error) {
                    console.error('Error deleting service:', error);
                } finally {
                    setDeleting(false);
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={handleDelete} disabled={deleting} className='text-red-400'>
                            {deleting ? 'Deleting...' : 'Delete'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];