import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { BASE_URL } from '../context/constants';

const OrderForm = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || cart.length === 0) return;

    const order = {
      name,
      phone,
      items: cart,
      totalPrice
    };

    try {
      const res = await axios.post(BASE_URL + '/order', order);
      setMessage(res.data.message);
      clearCart();
    } catch (err) {
      setMessage('Error placing order');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Place Your Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Confirm Order (₹{totalPrice.toFixed(2)})
        </button>
      </form>
      {message && <p className="mt-4 text-center text-blue-600 font-medium">{message}</p>}
    </div>
  );
};

export default OrderForm;
