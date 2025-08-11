import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/500"}
            alt={product.name}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            ₹{product.price || product.pricepermonth} / month
          </p>
          <p className="mb-6 text-gray-700">Category: {product.category}</p>
          <button
            onClick={() => toast.success(`${product.name} booked successfully!`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;