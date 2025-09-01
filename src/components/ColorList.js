import React from 'react';
import { useColors } from './ColorContext';
import ColorItem from './ColorItem';

const ColorList = () => {
  const { colors, loading, error } = useColors();

  if (loading) {
    return (
      <div className="mt-6" style={{ marginTop: '24px' }}>
        <div className="text-center py-16 text-blue-600" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3" style={{ fontSize: '24px', marginBottom: '12px' }}>Loading colors...</h3>
          <p className="text-base text-gray-600" style={{ fontSize: '16px' }}>Please wait while we fetch your color palette.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6" style={{ marginTop: '24px' }}>
        <div className="text-center py-16 text-red-600" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3" style={{ fontSize: '24px', marginBottom: '12px' }}>Error loading colors</h3>
          <p className="text-base text-gray-600 mb-5" style={{ fontSize: '16px', marginBottom: '20px' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-red-600"
            style={{ fontSize: '14px', padding: '10px 20px' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (colors.length === 0) {
    return (
      <div className="mt-6" style={{ marginTop: '24px' }}>
        <div className="text-center py-16 text-gray-600" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3" style={{ fontSize: '24px', marginBottom: '12px' }}>No colors found</h3>
          <p className="text-base" style={{ fontSize: '16px' }}>Try adding some colors or adjusting your filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6" style={{ marginTop: '24px' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5" style={{ gap: '20px' }}>
        {colors.map(color => (
          <ColorItem key={color.id} color={color} />
        ))}
      </div>
    </div>
  );
};

export default ColorList;
