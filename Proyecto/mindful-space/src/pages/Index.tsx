import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Home from "./Home";

const Index = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Home />;
};

export default Index;
