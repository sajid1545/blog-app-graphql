import { Link } from "react-router";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-wide">Welcome Home</h1>
        <p className="text-gray-400 text-lg">Navigate through the app</p>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <Link
            to="/posts"
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-medium transition-all duration-300"
          >
            Posts
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-medium transition-all duration-300"
          >
            Signup
          </Link>
          <Link
            to="/signin"
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-medium transition-all duration-300"
          >
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
