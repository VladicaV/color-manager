import React from 'react';
import { useColors } from './ColorContext';

const ColorFilter = () => {
  const { filter, setFilter, allColors, colors } = useColors();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const clearFilter = () => {
    setFilter('');
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-lg mb-6" style={{ padding: '20px', marginBottom: '24px' }}>
      <div className="flex justify-between items-center mb-4" style={{ marginBottom: '16px' }}>
        <h3 className="text-xl font-semibold text-gray-800" style={{ fontSize: '20px' }}>Filter Colors</h3>
        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full" style={{ fontSize: '14px', padding: '4px 12px' }}>
          Showing {colors.length} of {allColors.length} colors
        </span>
      </div>
      
      <div className="space-y-3" style={{ gap: '12px' }}>
        <div className="relative">
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search by name or hex value..."
            className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            style={{ fontSize: '16px', padding: '12px 16px 12px 16px' }}
          />
          {filter && (
            <button 
              onClick={clearFilter}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors p-1 rounded"
              title="Clear filter"
              style={{ fontSize: '18px', right: '12px', padding: '4px' }}
            >
              ×
            </button>
          )}
        </div>
        
        {filter && (
          <div className="text-sm text-gray-600 italic" style={{ fontSize: '14px' }}>
            <span>Filtering for: "{filter}"</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorFilter;
