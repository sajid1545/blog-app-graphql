import { createBrowserRouter } from "react-router";
import App from "../App";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import Posts from "../pages/posts/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        Component: App,
      },
      {
        path: "posts",
        Component: Posts,
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "signin",
        Component: Signin,
      },
    ],
  },
]);

export default router;
