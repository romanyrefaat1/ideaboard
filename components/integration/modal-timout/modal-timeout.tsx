import { X } from 'lucide-react';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

type ModalTimeoutProps = {
  title: string;
  parent?: React.RefObject<HTMLElement>;
  ratings: {
    label: string;
    emoji: string;
    value: number;
  }[];
  inputs: {
    label: string;
    placeholder: string;
  }[];
  buttonText: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

// Modal component
export default function ModalTimeout({
  title,
  parent,
  ratings,
  inputs,
  buttonText,
  isOpen = true,
  onOpenChange,
  timeoutDuration = 0
}) {
  const [selectedRating, setSelectedRating] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [animate, setAnimate] = useState(null);

  // Return null early if modal shouldn't be shown
  if (!isOpen) {
    return null;
  }

  // Auto-close the modal if timeoutDuration is set
  React.useEffect(() => {
    if (timeoutDuration > 0 && isOpen) {
      const timer = setTimeout(() => {
        if (onOpenChange) {
          onOpenChange(false);
        }
      }, timeoutDuration * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onOpenChange, timeoutDuration]);

  const handleRatingClick = (value) => {
    setSelectedRating(value);
    setAnimate(value);
    setTimeout(() => setAnimate(null), 800);
  };

  const handleSave = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  // Sort ratings by value to ensure they appear in the correct order
  const sortedRatings = [...ratings].sort((a, b) => a.value - b.value);

  // The modal content (shared between both rendering methods)
  const modalContent = (
    <div className="p-6 w-full h-full bg-white rounded-lg shadow-lg">
      {/* Title and close button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button 
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-semibold"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Rating options */}
      <div className="flex items-center justify-between mb-8 relative">
        {/* Line connecting the ratings */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300" />
        
        {sortedRatings.map((rating, index) => (
          <div key={index} className="flex flex-col items-center z-10">
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg 
                ${selectedRating === rating.value ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'} 
                border-2 transition-all duration-300 relative`}
              onClick={() => handleRatingClick(rating.value)}
            >
              <span className={`transition-all duration-500 transform ${animate === rating.value ? 'scale-125' : 'scale-100'}`}>
                {rating.emoji}
              </span>
              {animate === rating.value && (
                <span className="absolute inset-0 rounded-full bg-blue-300 opacity-50 animate-ping" />
              )}
            </button>
            <span className="text-sm text-gray-600 mt-2">{rating.label}</span>
          </div>
        ))}
      </div>

      {/* Feedback inputs */}
      {inputs.map((input, index) => (
        <div key={index} className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">{input.label}</label>
          <input
            type="text"
            placeholder={input.placeholder}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ))}

      {/* Footer */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-md flex items-center">
          <span className="mr-1">✏️</span> Made by <span className="text-blue-500 ml-1">@Dearboard</span>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-medium transition-colors duration-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  // Mode 1: In-container modal
  if (parent && parent.current) {
    return createPortal(
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        {modalContent}
      </div>,
      parent.current
    );
  }

  // Mode 2: Full-page modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="max-w-md w-full">
        {modalContent}
      </div>
    </div>
  );
}