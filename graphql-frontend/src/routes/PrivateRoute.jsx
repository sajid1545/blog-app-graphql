import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  let location = useLocation();

  if (token) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
