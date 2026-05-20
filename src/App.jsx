import React, { useEffect, useState } from 'react'
import { getCsrfToken, getCurrentUser } from './services/authService';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await getCsrfToken();

        try {
          console.log("FUTOK");
          
          const userData = await getCurrentUser();
          
          setUser(userData);
        } catch (error) {
          setUser(null);
        }
      } catch (error) {
        console.error("Initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return <p>Betöltés...</p>;
  }

  return (
    <div>
      {user == null && <LoginForm onLoginSuccess={(userData) => setUser(userData)} />}

      { user && <>
      <p>Bejelentkezve: <strong>{user.username}</strong></p>
      <LogoutButton onLoggedOut={()=>setUser(null)} />
      </>}
    </div>
  )
}

export default App