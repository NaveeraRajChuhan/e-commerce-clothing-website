import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white rounded-lg shadow-xl p-4 flex items-center gap-3 min-w-[250px]"
      >
        {type === 'success' ? (
          <CheckCircleIcon className="w-6 h-6 text-green-400" />
        ) : (
          <InformationCircleIcon className="w-6 h-6 text-blue-400" />
        )}
        <span className="flex-1 text-sm">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;