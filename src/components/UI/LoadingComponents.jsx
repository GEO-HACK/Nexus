import React from 'react';

/**
 * Reusable loading component
 * Separates loading UI from business logic
 */
export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

/**
 * Error display component
 * Separates error UI from business logic
 */
export const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
