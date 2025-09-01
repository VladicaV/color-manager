import React, { useState } from 'react';
import { useColors } from './ColorContext';

const ColorForm = () => {
  const [name, setName] = useState('');
  const [hex, setHex] = useState('#');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addColor, allColors } = useColors();

  const validateHex = (hexValue) => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    return hexRegex.test(hexValue);
  };

  // Check if color already exists and return details
  const checkExistingColor = (name, hex) => {
    const normalizedName = name.trim().toLowerCase();
    const normalizedHex = hex.toUpperCase();
    
    const existingByName = allColors.find(color => 
      color.name.toLowerCase() === normalizedName
    );
    
    const existingByHex = allColors.find(color => 
      color.hex.toUpperCase() === normalizedHex
    );
    
    return { existingByName, existingByHex };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!name.trim()) {
      setError('Color name is required');
      setIsSubmitting(false);
      return;
    }

    if (!validateHex(hex)) {
      setError('Please enter a valid hex color (e.g., #FF0000)');
      setIsSubmitting(false);
      return;
    }

    // Check for existing colors before submitting
    const { existingByName, existingByHex } = checkExistingColor(name, hex);
    
    if (existingByName || existingByHex) {
      let errorMessage = 'Cannot add duplicate color:\n';
      if (existingByName) {
        errorMessage += `• Name "${existingByName.name}" already exists with hex ${existingByName.hex}\n`;
      }
      if (existingByHex) {
        errorMessage += `• Hex ${existingByHex.hex} already exists with name "${existingByHex.name}"`;
      }
      setError(errorMessage);
      setIsSubmitting(false);
      return;
    }

    const success = await addColor(name, hex);
    if (success) {
      setName('');
      setHex('#');
    }
    setIsSubmitting(false);
  };

  const handleHexChange = (e) => {
    const value = e.target.value;
    if (value.startsWith('#') || value === '') {
      setHex(value);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mb-6" style={{ padding: '24px', marginBottom: '24px' }}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-5" style={{ fontSize: '24px', marginBottom: '20px' }}>Add New Color</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5" style={{ marginBottom: '20px' }}>
          <label htmlFor="colorName" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontSize: '14px', marginBottom: '8px' }}>
            Color Name:
          </label>
          <input
            type="text"
            id="colorName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter color name"
            maxLength="50"
            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            style={{ fontSize: '16px', padding: '12px' }}
          />
        </div>
        
        <div className="mb-5" style={{ marginBottom: '20px' }}>
          <label htmlFor="colorHex" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontSize: '14px', marginBottom: '8px' }}>
            Hex Value:
          </label>
          <div className="flex items-center gap-3" style={{ gap: '12px' }}>
            <input
              type="text"
              id="colorHex"
              value={hex}
              onChange={handleHexChange}
              placeholder="#FF0000"
              maxLength="7"
              className="flex-1 px-3 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              style={{ fontSize: '16px', padding: '12px' }}
            />
            <div 
              className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
              style={{ backgroundColor: validateHex(hex) ? hex : '#ccc', width: '40px', height: '40px' }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm" style={{ padding: '12px', marginBottom: '16px', fontSize: '14px', whiteSpace: 'pre-line' }}>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 active:transform active:translate-y-0.5 disabled:cursor-not-allowed disabled:transform-none"
          style={{ 
            fontSize: '16px', 
            padding: '12px 24px',
            backgroundColor: isSubmitting ? '#9ca3af' : '#5e2ecc',
            boxShadow: isSubmitting ? 'none' : '0 4px 14px 0 rgba(94, 46, 204, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#4c1d9a';
              e.target.style.boxShadow = '0 6px 20px 0 rgba(94, 46, 204, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#5e2ecc';
              e.target.style.boxShadow = '0 4px 14px 0 rgba(94, 46, 204, 0.3)';
            }
          }}
        >
          {isSubmitting ? 'Adding...' : 'Add Color'}
        </button>
      </form>
    </div>
  );
};

export default ColorForm;
