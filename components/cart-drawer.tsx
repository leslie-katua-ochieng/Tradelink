import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";

interface Service {
    id: number;
    name: string;
    price: number;
}

interface CartDrawerProps {
    cart: Service[];
    // Function to remove item from cart
}

export function CartDrawer({ cart = []}: CartDrawerProps) {
    const [loading, setLoading] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [personalData, setPersonalData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: ""
    });

    const handleCheckout = async () => {
        if (validatePersonalData()) {
            try {
                setLoading(true);
    
                const checkoutData = {
                    ...personalData,
                    cart: cart,
                    totalPrice: cart.reduce((total, item) => total + item.price, 0),
                    status: 'pending' // Set the status here
                };
    
                const response = await fetch("http://localhost:5000/checkout/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(checkoutData)
                });
    
                if (response.ok) {
                    setCheckoutMessage("Checkout successful!");
                } else {
                    console.error("Error during checkout:", response.statusText);
                }
            } catch (error) {
                console.error("Error during checkout:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setShowModal(true);
        }
    };
    

    const validatePersonalData = () => {
        // Perform validation on personal data fields
        return personalData.firstName !== "" && personalData.lastName !== "" && personalData.email !== "" && personalData.phoneNumber !== "" && personalData.address !== "";
    };

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <Sheet>
            <SheetTrigger><Icons.cart className="h-5 w-5" /></SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Your cart</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="mb-3">
                                {item.name} - KES{item.price}
                            </li>
                        ))}
                    </ul>
                    <div className="fixed bottom-0 right-0 p-4 bg-white shadow-md">
                        Total: KES{totalPrice}
                    </div>
                    {checkoutMessage && (
                        <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white">
                            {checkoutMessage}
                        </div>
                    )}
                    <Button className="fixed bottom-0 mb-2" onClick={handleCheckout} disabled={loading}>
                        {loading ? "Processing..." : "Checkout"}
                    </Button>
                    {showModal && (
                        
                        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
                            <div className="bg-white p-4 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Complete your order</h2>
                                <input type="text" placeholder="First Name" value={personalData.firstName} onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })} className="mb-2 p-2 border border-gray-300 rounded-md" /><br></br>
                                <input type="text" placeholder="Last Name" value={personalData.lastName} onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })} className="mb-2 p-2 border border-gray-300 rounded-md" /><br></br>
                                <input type="email" placeholder="Email" value={personalData.email} onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })} className="mb-2 p-2 border border-gray-300 rounded-md" /><br></br>
                                <input type="tel" placeholder="Phone Number" value={personalData.phoneNumber} onChange={(e) => setPersonalData({ ...personalData, phoneNumber: e.target.value })} className="mb-2 p-2 border border-gray-300 rounded-md" /><br></br>
                                <input type="text" placeholder="Address" value={personalData.address} onChange={(e) => setPersonalData({ ...personalData, address: e.target.value })} className="mb-2 p-2 border border-gray-300 rounded-md" /><br></br>
                                <Button onClick={() => setShowModal(false)} className="mr-2">Cancel</Button>
                                <Button onClick={handleCheckout}>Checkout</Button>
                            </div>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}