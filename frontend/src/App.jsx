import React from 'react';
import AppRouter from './routers/router'; 
import { Toaster } from 'react-hot-toast'; 

const App = () => {
  return (
    <div className="antialiased selection:bg-cyan-500/30">

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#111827',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />

      <AppRouter />
    </div>
  );
};

export default App;