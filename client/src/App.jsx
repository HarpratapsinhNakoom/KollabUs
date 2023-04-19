import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./components/Authentication/PrivateRoutes";
import Login from "./components/Authentication/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import Profile from "./components/Authentication/Profile";
import Signup from "./components/Authentication/Signup";
import UpdateProfile from "./components/Authentication/UpdateProfile";
import ValidAuth from "./components/Authentication/ValidAuth";
import "./App.css";
import Document from "./pages/FileView/FileView";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* WorkAreas */}
          <Route
            exact
            path="/"
            element={
              <PrivateRoutes>
                <HomePage />
              </PrivateRoutes>
            }
          />

          <Route
            path="/:spaceId"
            element={
              <PrivateRoutes>
                <HomePage />
              </PrivateRoutes>
            }
          />

          <Route
            path="/:spaceId/folders/:folderId"
            element={
              <PrivateRoutes>
                <HomePage />
              </PrivateRoutes>
            }
          />

          <Route
            path="/document/:fileId"
            element={
              <PrivateRoutes>
                <Document />
              </PrivateRoutes>
            }
          />

          {/* Profiles */}
          <Route
            path="/profile"
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            }
          />
          <Route
            path="/update-profile"
            element={
              <PrivateRoutes>
                <UpdateProfile />
              </PrivateRoutes>
            }
          />

          {/* Auth */}
          <Route
            path="/signup"
            element={
              <ValidAuth>
                <Signup />
              </ValidAuth>
            }
          />
          <Route
            path="/login"
            element={
              <ValidAuth>
                <Login />
              </ValidAuth>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
