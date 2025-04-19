import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../context/constants';

const OrderHistory = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false); // Track if search was made

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/order/${phone}`);
      setOrders(res.data);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setOrders([]);
      setSearched(true);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Order History</h2>

      <div className="flex items-center space-x-2 mb-4">
        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter phone number"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={fetchOrders}
        >
          Search
        </button>
      </div>

      {searched && orders.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No order history found for this number.</p>
      )}

      {orders.length > 0 && (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded-md shadow-md">
              <h4 className="font-bold text-lg mb-1">Order #{order._id}</h4>
              <p className="text-sm text-gray-600 mb-2">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              <ul className="list-disc list-inside text-sm mb-2">
                {order.items.map(i => (
                  <li key={i._id}>{i.name} x {i.quantity}</li>
                ))}
              </ul>
              <p className="text-right font-semibold">Total: ₹{order.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
