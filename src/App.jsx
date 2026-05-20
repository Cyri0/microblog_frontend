import React, { useEffect, useState } from "react";
import { getCsrfToken, getCurrentUser } from "./services/authService";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import PostList from "./components/PostList";
import CreatePostForm from "./components/CreatePostForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshPostsKey, setRefreshPostsKey] = useState(0);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await getCsrfToken();

        try {
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
      {user === null && (
        <LoginForm onLoginSuccess={(userData) => setUser(userData)} />
      )}

      {user && (
        <>
          <p>
            Bejelentkezve: <strong>{user.username}</strong>
          </p>
          <LogoutButton onLoggedOut={() => setUser(null)} />
          <CreatePostForm
            onPostCreated={() => setRefreshPostsKey((prev) => prev + 1)}
          />
          <PostList refreshKey={refreshPostsKey} />
        </>
      )}
    </div>
  );
};

export default App;