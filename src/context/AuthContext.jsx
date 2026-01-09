import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email") || "");

  const login = (jwt, email) => {
    setToken(jwt);
    setUserEmail(email);
    localStorage.setItem("token", jwt);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setToken(null);
    setUserEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
