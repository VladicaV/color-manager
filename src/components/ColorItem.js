import React, { useState } from 'react';
import { useColors } from './ColorContext';

const ColorItem = ({ color }) => {
  const { deleteColor } = useColors();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${color.name}"?`)) {
      setIsDeleting(true);
      await deleteColor(color.id);
      setIsDeleting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show a temporary notification
      const notification = document.createElement('div');
      notification.textContent = `Copied ${text} to clipboard!`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #896ace;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
      `;
      
      // Add animation keyframes
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
      
      document.body.appendChild(notification);
      
      // Remove notification after 2 seconds
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy to clipboard:', err);
    });
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden flex flex-col items-center" style={{ padding: '16px' }}>
      <div 
        className="w-4/5 h-28 rounded-lg mb-3 relative border-2 border-gray-200 overflow-hidden"
        style={{ backgroundColor: color.hex, width: '80%', height: '112px', marginBottom: '12px' }}
      >
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button 
            className="bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center text-base transition-all hover:scale-110"
            onClick={() => copyToClipboard(color.hex)}
            title="Copy hex value"
            style={{ fontSize: '16px', width: '40px', height: '40px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 2H9C7.89543 2 7 2.89543 7 4V16C7 17.1046 7.89543 18 9 18H15C16.1046 18 17 17.1046 17 16V4C17 2.89543 16.1046 2 15 2Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontSize: '18px', marginBottom: '8px' }}>{color.name}</h4>
        <p 
          className="text-sm text-gray-600 font-mono cursor-pointer px-2 py-1 rounded transition-colors hover:bg-gray-100 hover:text-gray-800"
          onClick={() => copyToClipboard(color.hex)}
          style={{ fontSize: '14px', padding: '4px 8px' }}
        >
          {color.hex}
        </p>
      </div>
      
      <button 
        className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm transition-all opacity-0 hover:opacity-100 hover:scale-110 group-hover:opacity-100"
        onClick={handleDelete}
        title="Delete color"
        disabled={isDeleting}
        style={{ fontSize: '14px', top: '8px', right: '8px', width: '32px', height: '32px' }}
      >
        {isDeleting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" style={{ height: '16px', width: '16px' }}></div>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default ColorItem;
