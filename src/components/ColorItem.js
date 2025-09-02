import React, { useState } from 'react';
import { useColors } from './ColorContext';
import { ReactComponent as CopyIcon } from "../icons/copy.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";

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
            <CopyIcon/>
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
          <DeleteIcon/>
        )}
      </button>
    </div>
  );
};

export default ColorItem;
