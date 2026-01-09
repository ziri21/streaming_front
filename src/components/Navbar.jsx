// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">
          <span className="logo-main">Stream</span>
          <span className="logo-accent">Vault</span>
          <span>Videos</span>
        </span>
      </div>

      <div className="nav-center">
        <Link to="/videos">Videos</Link>
        <Link to="/add-video">Add video</Link>
      </div>

      <div className="nav-right">
        {token ? (
          <>
            <Link to="/account/update-password">Account</Link>
            <span className="nav-email">{userEmail}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
