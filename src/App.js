// src/App.jsx
import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (3 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
