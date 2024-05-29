// components/Cart.tsx

import React from 'react';

interface Service {
  id: number;
  name: string;
  price: number;
}

interface CartProps {
  cart: Service[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
