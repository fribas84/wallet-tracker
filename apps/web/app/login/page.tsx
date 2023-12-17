"use client"
import { useState } from 'react'
import Link from 'next/link';


type Props = {}

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the login logic here
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="w-2/3 p-8 bg-white rounded shadow-md">
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="current-password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="current-password"
              autoComplete='current-password'
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded hover:bg-teal-500 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link className="mx-5 inline-block text-sm font-bold text-teal-500 align-baseline hover:text-teal-800" href="/signup">
            Sign up
          </Link>
          <Link className="mx-5 inline-block ml-2 text-sm font-bold text-teal-500 align-baseline hover:text-teal-800" href="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login