import { useState } from "react";
import { getCurrentUser, loginUser } from "../services/authService";

function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await loginUser(formData);
      const userData = await getCurrentUser();
      onLoginSuccess(userData);

      setFormData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Login failed:", error);
      setError("Sikertelen bejelentkezés.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Bejelentkezés</h2>

      <div>
        <label htmlFor="username">Felhasználónév:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Jelszó:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Bejelentkezés</button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;