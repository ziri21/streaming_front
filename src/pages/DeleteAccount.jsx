import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const DeleteAccount = () => {
  const { userEmail, logout } = useAuth();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.delete("/auth/deleteAccount", {
        data: { password },
      });
      logout();
      navigate("/signup");
    } catch (err) {
      setMessage(err.response?.data?.message || "Deletion failed");
    }
  };

  return (
    <div className="page-container">
      <h1>Delete Your Account</h1>
      <p>
        You are about to delete the account associated with <b>{userEmail}</b>.
      </p>
      <p className="warning">
        Irreversible Action: Deleting your StreamVault account is permanent.
      </p>
      <form onSubmit={handleDelete} className="card narrow">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Enter your password to confirm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && <p className="info">{message}</p>}
        <div className="actions">
          <button type="submit" className="danger">
            Delete My Account
          </button>
          <button type="button" onClick={() => navigate("/videos")}>
            Cancel
          </button>
        </div>
      </form>
      <footer>© 2024 StreamVault. All rights reserved.</footer>
    </div>
  );
};

export default DeleteAccount;
