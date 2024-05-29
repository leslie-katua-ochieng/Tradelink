'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Icons } from '@/components/icons';
import { CartDrawer } from '@/components/cart-drawer';
import Link from 'next/link';

interface Services {
  id: number;
  name: string;
  description: string;
  price: number;
  img: {
    data: string;
  };
  contact: string;
  location: {
    latitude: number;
    longitude: number;
  };
  area: string;
}

const Services: React.FC = () => {
  const [serviceInfo, setServiceInfo] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Services[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const query = await fetch(`${apiUrl}/services`);
      const response = await query.json();
      const servicesWithLocation = response.map((service: Services) => ({
        ...service,
        location: {
          latitude: service.location.latitude, // no need for parseFloat
          longitude: service.location.longitude, // no need for parseFloat
        },
      }));
      setServiceInfo(servicesWithLocation);
      setLoading(false);
    };
     getData();
  }, []);

  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const addToCart = (service: Services) => {
    setCart([...cart, service]);
  };

  // Filter serviceInfo based on searchQuery
  const filteredServices = serviceInfo.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter services based on user's location if available
  const distanceThreshold = 10; // Threshold in kilometers
  const nearbyServices = userLocation
    ? filteredServices.filter((service) => {
        const serviceLocation = service.location;
        if (serviceLocation) {
          const distance = calculateDistance(userLocation.latitude, userLocation.longitude, serviceLocation.latitude, serviceLocation.longitude);
          return distance <= distanceThreshold;
        }
        return false;
      })
    : filteredServices; // Display all services if user's location is not available
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nearbyServices.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div className="flex">
        <div className="flex items-center py-4">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex items-center py-4 ml-[1000px]">
          <CartDrawer cart={cart} />
        </div>
      </div>
      {loading ? (
        <div className="loader">
          <div className="spinner">loading</div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
        {/* {currentItems.map((service) => ())} */}
          {currentItems.map((service) => (

            <Card key={service.id} className="w-[250px]">
              <CardHeader>
                {service.img && service.img.data && (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${Buffer.from(service.img.data).toString('base64')}`}
                      alt={service.name}
                      className="h-32 w-[250px] rounded"
                    />
                  </div>
                )}
                <CardTitle className='text-base'>{service.name}</CardTitle>
                <CardDescription className="text-left">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 font-bold">
                  <span className="">Kes</span>
                  <p>{service.price}</p>
                </div>
                <div className="flex gap-2 font-bold">
                  <p>{service.area}</p>
                </div>
              </CardContent>
              <CardFooter>
                {service.price !== undefined && service.price !== null && service.price > 0 ? (
                  <Button onClick={() => addToCart(service)}>
                    <Icons.cart className="mr-2 h-4 w-4" />
                    Add to cart
                  </Button>
                ) : (
                  <Link href={`${service.contact}`}>
                    <Button>Inquire</Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default Services;