import React, { createContext, useContext, useState, useEffect } from 'react';
import ColorAPI from '../services/api';

const ColorContext = createContext();

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
};

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load colors from API on component mount
  useEffect(() => {
    const fetchColors = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedColors = await ColorAPI.getColors();
        setColors(fetchedColors);
      } catch (err) {
        setError('Failed to load colors from server');
        console.error('Error fetching colors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  const addColor = async (name, hex) => {
    try {
      setError(null);
      
      const newColor = {
        name: name.trim(),
        hex: hex.toUpperCase()
      };
      
      const addedColor = await ColorAPI.addColor(newColor);
      setColors(prevColors => [...prevColors, addedColor]);
      return true;
    } catch (err) {
      setError('Failed to add color');
      console.error('Error adding color:', err);
      return false;
    }
  };

  const deleteColor = async (id) => {
    try {
      setError(null);
      await ColorAPI.deleteColor(id);
      setColors(prevColors => prevColors.filter(color => color.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete color');
      console.error('Error deleting color:', err);
      return false;
    }
  };

  const filteredColors = colors.filter(color =>
    color.name.toLowerCase().includes(filter.toLowerCase()) ||
    color.hex.toLowerCase().includes(filter.toLowerCase())
  );

  const value = {
    colors: filteredColors,
    allColors: colors,
    filter,
    setFilter,
    addColor,
    deleteColor,
    loading,
    error
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};
