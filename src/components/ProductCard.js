import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon as HeartOutline, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onAddReview }) => {
  const { addToCart, likedProducts, toggleLike } = useCart();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [imageError, setImageError] = useState(false);

  const isLiked = likedProducts.includes(product.id);
  const displayImage = imageError ? product.imageFallback : product.image;

  const handleSubmitReview = () => {
    if (reviewName.trim() && reviewComment.trim()) {
      onAddReview(product.id, reviewName, reviewComment, reviewRating);
      setShowReviewModal(false);
      setReviewName('');
      setReviewComment('');
      setReviewRating(5);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative overflow-hidden h-72">
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={() => setImageError(true)}
          />
          <button
            onClick={() => toggleLike(product.id)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            {isLiked ? (
              <HeartSolid className="w-5 h-5 text-red-500 like-active" />
            ) : (
              <HeartOutline className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {product.rating >= 4.5 && (
            <div className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
              Best Seller
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.description}</p>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
            <div className="flex items-center text-yellow-500">
              <StarIcon className="w-4 h-4 fill-current" />
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
              <span className="text-xs text-gray-400 ml-1">({product.reviews?.length || 0})</span>
            </div>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(product)}
              className="flex-1 bg-gray-900 text-white py-2 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowReviewModal(true)}
              className="px-4 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition font-medium"
            >
              Review
            </motion.button>
          </div>

          {/* Reviews Preview */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500">
                <span className="font-semibold">Latest:</span> {product.reviews[0].userName}: "{product.reviews[0].comment.slice(0, 50)}..."
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Review {product.name}</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="w-full border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <textarea
                placeholder="Write your review..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows="3"
                className="w-full border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <div className="flex items-center mb-4">
                <span className="mr-2 font-medium">Rating:</span>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setReviewRating(r)}
                    className="text-2xl focus:outline-none"
                  >
                    <StarIcon
                      className={`w-6 h-6 ${
                        r <= reviewRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Submit Review
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;