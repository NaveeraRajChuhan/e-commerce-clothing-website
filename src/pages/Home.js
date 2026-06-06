import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = ({ onAddReview }) => {
  const featuredProducts = products.slice(0, 4);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 py-24 md:py-32 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            Summer Collection 2024
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover the latest trends with premium quality fashion. Free shipping worldwide.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition"
          >
            Shop Now →
          </motion.button>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">Our best selling items this season</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} onAddReview={onAddReview} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: '🔄', title: '30-Day Returns', desc: 'Hassle-free returns' },
              { icon: '💎', title: 'Premium Quality', desc: 'Guaranteed satisfaction' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-2">Join Our Newsletter</h3>
          <p className="mb-6">Get 10% off your first purchase and exclusive offers!</p>
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;