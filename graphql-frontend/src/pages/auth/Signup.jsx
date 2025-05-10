/* eslint-disable no-unused-vars */
import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const RegisterUser = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $bio: String
  ) {
    signup(name: $name, email: $email, password: $password, bio: $bio) {
      userError
      token
    }
  }
`;

const Signup = () => {
  const [registerUser, { data, loading, error }] = useMutation(RegisterUser);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const userData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      bio: e.target.bio.value,
    };
    registerUser({ variables: userData });
  };

  useEffect(() => {
    if (data?.signup?.token) {
      navigate("/signin");
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link to="/">
            <h2 className="text-center text-3xl font-bold tracking-tight text-white">
              Create your account
            </h2>
          </Link>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Bio (Optional) */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium">
              Bio <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="3"
              placeholder="Tell us something about yourself..."
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500 transition cursor-pointer"
            >
              {loading ? "Registering" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
