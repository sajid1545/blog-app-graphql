import { Route, Routes } from "react-router";
import App from "../App";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import Posts from "../pages/posts/Posts";
import PrivateRoutes from "./PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="posts"
        element={
          <PrivateRoutes>
            <Posts />
          </PrivateRoutes>
        }
      />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
    </Routes>
  );
};

export default Router;
