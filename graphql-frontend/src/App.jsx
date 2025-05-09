import { Link } from "react-router";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white text-xl">
      <h1>Welcome HOME</h1>

      <div className="flex gap-4 mt-4">
        <Link
          className="hover:text-blue-500 transition-all duration-300"
          to="/posts"
        >
          Posts
        </Link>
        <Link
          className="hover:text-blue-500 transition-all duration-300"
          to="/signup"
        >
          Signup
        </Link>
        <Link
          className="hover:text-blue-500 transition-all duration-300"
          to="/signin"
        >
          Signin
        </Link>
      </div>
    </div>
  );
}

export default App;
