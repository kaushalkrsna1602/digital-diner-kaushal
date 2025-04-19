import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    navigate('/order');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
              <div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-lg font-medium">₹{item.price * item.quantity}</p>
            </div>
          ))}
          <div className="text-right text-xl font-bold">Total: ₹{total.toFixed(2)}</div>
          <div className="flex justify-end">
            <button
              onClick={handlePlaceOrder}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md transition-all"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
