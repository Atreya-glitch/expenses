import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Navigation from './src/navigation';

export default function App() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </div>
  );
}

