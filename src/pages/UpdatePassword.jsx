import { useState } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const UpdatePassword = () => {
  const { userEmail } = useAuth();
  const [email, setEmail] = useState(userEmail || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.put("/auth/updatePassword", {
        email,
        currentPassword,
        newPassword,
      });
      setMessage("Password updated successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="page-container">
      <h1>Update Your Password</h1>
      <p className="muted">Secure your account by changing your password.</p>
      <form onSubmit={handleSubmit} className="card narrow">
        <label>Email address</label>
        <input
          type="email"
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Current password</label>
        <input
          type="password"
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <label>New password</label>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p className="hint">
          At least 8 characters, upper and lower case, numbers, special characters.
        </p>
        {message && <p className="info">{message}</p>}
        <button type="submit" className="primary">
          Update password
        </button>
      </form>
      <footer>© 2024 StreamVault. All rights reserved.</footer>
    </div>
  );
};

export default UpdatePassword;
