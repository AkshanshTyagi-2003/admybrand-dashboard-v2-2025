"use client";

import React, { useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { BrainCog } from "lucide-react";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-700 to-indigo-600">
      <div className="bg-gradient-to-b from-[#8a7cff] to-[#a89eff] rounded-2xl shadow-lg p-16 max-w-lg w-full">
        <div className="flex justify-center mb-8">
          <div className="bg-purple-600 rounded-full h-20 w-20 flex items-center justify-center">
            <BrainCog className="text-white w-10 h-10" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4 text-center">AIBoard</h1>
        <h2 className="text-xl text-white mb-10 text-center">AI-Powered Dashboard</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-lg text-white mb-2">Email Address</label>
          <div className="relative">
            <EnvelopeIcon className="h-5 w-5 text-white text-opacity-50 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-4 border border-white border-opacity-40 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-white placeholder-opacity-50 text-base bg-transparent"
            />
          </div>

          <label htmlFor="password" className="block text-lg text-white mt-6 mb-2">Password</label>
          <div className="relative">
            <LockClosedIcon className="h-5 w-5 text-white text-opacity-50 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-4 border border-white border-opacity-40 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-white placeholder-opacity-50 text-base bg-transparent"
            />
          </div>

          <div className="flex justify-between items-center text-lg text-white mt-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-white font-semibold">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="mt-10 w-full py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition"
          >
            Sign In
          </button>
        </form>

        <footer className="mt-12 text-base text-white text-center">
          Need help? Contact your system administrator.
        </footer>
      </div>
    </div>
  );
}

export default LoginForm;
