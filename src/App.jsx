import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import DeleteAccount from "./pages/DeleteAccount";
import VideosList from "./pages/VideosList";
import AddVideo from "./pages/AddVideo";
import Player from "./pages/Player";
import "./styles.css";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const { token } = useAuth();
  const location = useLocation();

  // cacher la navbar sur login / signup ou si pas connecté
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && token && <Navbar />}

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/videos" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/account/update-password"
            element={
              <PrivateRoute>
                <UpdatePassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/account/delete"
            element={
              <PrivateRoute>
                <DeleteAccount />
              </PrivateRoute>
            }
          />
          <Route
            path="/videos"
            element={
              <PrivateRoute>
                <VideosList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-video"
            element={
              <PrivateRoute>
                <AddVideo />
              </PrivateRoute>
            }
          />
          <Route
            path="/player/:id"
            element={
              <PrivateRoute>
                <Player />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
