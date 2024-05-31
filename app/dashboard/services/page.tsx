'use client'
import { useState, useEffect } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function Page() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true);
          const response = await fetch(`${apiUrl}/services/`);
          if (!response.ok) {
            throw new Error('Failed to fetch services');
          }
          const data = await response.json();
          setServices(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching services:', error);
          setLoading(false);
        }
      }
  
      fetchData();
    }, []);
  
    return (
      <div className="flex-1 space-y-4 p-8 pt-6 ml-64">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <DataTable columns={columns} data={services} />
          </div>
        )}
      </div>
    );
  }