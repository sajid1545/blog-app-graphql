import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const SIGNIN_USER = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }
`;

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loginUser, { data, loading, error }] = useMutation(SIGNIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser({
        variables: { email, password },
      });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    if (data?.signin?.token) {
      localStorage.setItem("token", data.signin.token);
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white px-4">
      <div className="w-full max-w-md space-y-8">
        <Link to="/">
          <h2 className="text-center text-3xl font-bold">
            Sign in to your account
          </h2>
        </Link>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {loading && <p className="text-sm text-yellow-400">Logging in...</p>}
          {error && (
            <p className="text-sm text-red-500">Error: {error.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500 transition disabled:opacity-50"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
