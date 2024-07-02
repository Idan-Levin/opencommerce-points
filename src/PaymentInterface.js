import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, RotateCw } from 'lucide-react';

const PaymentInterface = () => {
  const [points, setPoints] = useState(1000);
  const [animatingPoints, setAnimatingPoints] = useState(1000);
  const animationRef = useRef(null);

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animatePoints = (start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentPoints = Math.round(start + (end - start) * easedProgress);
      setAnimatingPoints(currentPoints);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setAnimatingPoints(end); // Ensure we reach the exact final value
      }
    };
    animationRef.current = requestAnimationFrame(step);
  };

  const handlePayNow = () => {
    const newPoints = points + 100;
    setPoints(newPoints);
    animatePoints(points, newPoints, 2000); // 2 seconds animation
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-sm mx-auto font-sans relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="4" fill="white"/>
            <rect y="10" width="24" height="4" fill="white"/>
            <rect y="20" width="24" height="4" fill="white"/>
          </svg>
          <span className="ml-2 font-bold">OpenCommerce</span>
        </div>
        <div className="bg-gray-800 px-3 py-1 rounded-full border border-green-400">
          <span className="text-green-400 font-bold">{animatingPoints} GIGGLES </span>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-2xl font-bold mb-1">Pay 1.00 USD</p>
        <p className="text-sm text-gray-400">To OpenCommerce</p>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">Ξ</span>
            </div>
            <div>
              <p className="font-medium">Pay with</p>
              <p className="text-sm">ETH on Base</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-green-400 mr-2">Approved</p>
            <p className="text-lg font-medium mr-2">$24.39</p>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-1">Available</p>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Compliance Check</span>
          <RotateCw className="text-gray-400" size={16} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Eligibility Check</span>
          <RotateCw className="text-gray-400" size={16} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Promotion Application</span>
          <RotateCw className="text-gray-400" size={16} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Payment Distribution</span>
          <RotateCw className="text-gray-400" size={16} />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Network fee</span>
          <span className="text-white">$0.19 USD</span>
        </div>
        <div className="flex justify-between text-xs">
          <span></span>
          <span className="text-gray-400">0.00003902 ETH</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium">
          <span>Total</span>
          <span>$1.19 USD</span>
        </div>
      </div>
      
      <button 
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        onClick={handlePayNow}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentInterface;