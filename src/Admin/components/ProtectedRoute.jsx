import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Loader from "../../Components/Loader.jsx";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) return <Loader />;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;
