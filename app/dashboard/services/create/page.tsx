'use client'
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Page() {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

    async function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const formData = new FormData(event.currentTarget);
        formData.append('latitude', latitude!.toString()); // ! used because we handle the case where they are null
        formData.append('longitude', longitude!.toString());

        const response = await fetch(`${apiUrl}/services/`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        // Reload the page after form submission
        window.location.reload();
    }

    function fetchLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    return (
        <div className="flex flex-col mr-64 ml-64 mt-8 space-y-4">
            <form onSubmit={onSubmit}>
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name"/>
                <Label htmlFor="description">Description</Label>
                <Input type="text" name="description"/>
                <Label htmlFor="price">Price</Label>
                <Input type="number" name="price"/>
                <Label htmlFor="area">Location</Label>
                <Input type="text" name="area"/>
                <Label htmlFor="contact">Contact</Label>
                <Input type="text" name="contact"/>
                <Label htmlFor="img">Image</Label>
                <Input type="file" name="img"/>
                <div className="mt-4">
                    <Button type="button" onClick={fetchLocation}>Fetch Location</Button>
                    {latitude !== null && longitude !== null && (
                        <p className="mt-4">Latitude: {latitude}, Longitude: {longitude}</p>
                    )}
                </div>
                <Button type="submit" className="mt-4">Submit</Button>
            </form>
        </div>
    )
}