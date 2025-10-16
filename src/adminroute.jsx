// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminRoute = ({ children }) => {
  const [cookies] = useCookies(["currentuser"]);
  const currentUser = cookies.currentuser;

  if (!currentUser) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (currentUser.role !== "admin") {
    // Logged in but not admin
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access
  return children;
};

export default AdminRoute;