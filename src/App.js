import React from 'react';
import { ColorProvider } from './components/ColorContext';
import ColorForm from './components/ColorForm';
import ColorFilter from './components/ColorFilter';
import ColorList from './components/ColorList';

function App() {
  return (
    <ColorProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <header className="bg-white/95 backdrop-blur-md py-8 text-center shadow-lg sticky top-0 z-50" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight" style={{ fontSize: '36px', marginBottom: '8px' }}>
            Color Manager
          </h1>
          <p className="text-lg text-gray-600" style={{ fontSize: '18px' }}>
            Manage your color palette with ease
          </p>
        </header>
        
        <main className="py-8" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          <div className="max-w-6xl mx-auto px-5" style={{ maxWidth: '1152px', paddingLeft: '20px', paddingRight: '20px' }}>
            <ColorForm />
            <ColorFilter />
            <ColorList />
          </div>
        </main>
      </div>
    </ColorProvider>
  );
}

export default App;
