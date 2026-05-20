import React, { useEffect, useState } from 'react'
import { getCsrfToken } from './services/authService';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await getCsrfToken();
      } catch (error) {
        console.error("Initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, []);

  return (
    <div>App</div>
  )
}

export default App