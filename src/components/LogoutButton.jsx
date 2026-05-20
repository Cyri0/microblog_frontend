import { logoutUser } from "../services/authService";

function LogoutButton({ onLoggedOut }) {
  const handleLogout = async () => {
    try {
      await logoutUser();
      onLoggedOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleLogout}>Kijelentkezés</button>;
}

export default LogoutButton;