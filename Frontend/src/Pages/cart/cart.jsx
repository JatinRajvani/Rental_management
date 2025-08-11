import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/outline'; // Add this import
import { toast } from 'react-toastify'; // Import toast

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user?.email) {
        setError('Please login to view your cart');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5500/api/cart/${user.email}`);
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch cart items');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user?.email]);

  const handleDeleteItem = async (productId) => {
    if (!user?.email) return;

    try {
      // Modified DELETE request URL to include both email and productId in the path
      await axios.delete(`http://localhost:5500/api/cartdelete/${user.email}/${productId}`);
      
      // Update local state to remove the item
      setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
      
      // Add user feedback
      toast.success('Item removed from cart successfully');
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
          {!user && (
            <button className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg">
              Login to View Cart
            </button>
          )}
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600">Start adding some items to your cart!</p>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div key={item.productId} className="bg-white rounded-lg shadow mb-4 p-4">
                <div className="flex items-center space-x-4">
                  {item.images && item.images[0] && (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.category}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-800">Quantity: {item.quantity}</span>
                      <span className="mx-4 text-gray-300">|</span>
                      <span className="text-gray-800">₹{item.price} per item</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <p className="font-semibold text-lg">₹{item.price * item.quantity}</p>
                    <button
                      onClick={() => handleDeleteItem(item.productId)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                      aria-label="Remove item"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
            <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;