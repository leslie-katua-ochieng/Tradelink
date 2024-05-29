'use client'
import { Label } from "@/components/ui/label"
import { Mail, PalmtreeIcon, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
    return(
        <>
        <div className="flex">
            
        <div className="m-2">
            <h1>Contact us</h1>
            <h1 className="text-4xl font-bold tracking-tight">Get in<span className="text-blue-700 font-bold">Touch</span><br/>Today</h1>
            <span className="flex"><Mail className="h-6 w-6"/><p className="ml-2">sales@tradelink.com</p></span>
            <span  className="flex"><Phone className="h-6 w-6"/><p className="ml-2">+254 720 201 0202</p></span>
            <span className="flex"><PalmtreeIcon className="h-6 w-6"/><p className="ml-2">Kabarak University</p></span>
        </div>
        <div className="m-2 p-10">
            <p>Engage with us now incase of any inquires. Call Us On +254 720 201 0202</p>
            <form>
                <Label htmlFor="name">Name</Label>
                <Input placeholder="John Doe"/>
                <Label htmlFor="name">Email</Label>
                <Input placeholder="example@email.com"/>
                <Label htmlFor="name">Phone</Label>
                <Input placeholder="(123) 456 758"/>
                <Label htmlFor="name">Company</Label>
                <Input placeholder="Facebook"/>
                <Label htmlFor="name">Message</Label>
                <Textarea placeholder="Type your message here." />
                <Button className="mt-2">Submit</Button>
            </form>
        </div>
        </div>
        </>
    )
}