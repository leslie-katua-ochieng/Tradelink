"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export type Orders = {
    _id: string
    totalPrice: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
    firstName: string
    address: string
}

export const columns: ColumnDef<Orders>[] =[
    
    {
      accessorKey: "status",
      header: "Status"
    },
    {
      accessorKey: "firstName",
      header: "First Name"
    },
    {
        accessorKey: "email",
        header:"email"
    },
    {
      accessorKey: "address",
      header: "Address"
    },
    {
        accessorKey: "totalPrice",
        header: () => <div className="text-right">Total</div>,
        cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalPrice"))
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "KES",
        }).format(amount)
 
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original
     
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
                <Link href={{ pathname: '/dashboard/orders/?', query: {_id: payment._id}}}>
                <DropdownMenuItem>
                  View Orders
                </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href={{ pathname: '/dashboard/orders/update/?', query: {_id: payment._id}}}>
                <DropdownMenuItem>Update Status</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]