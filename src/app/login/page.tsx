"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // after login complete, redirect to /pro
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        // Assume backend sets cookies on successful login
        console.log("Login successful!");
        router.push("/pro");
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-9 h-screen w-screen">
      <Link
        href="/pro"
        className="absolute top-4 left-4 text-blue-500 hover:underline items-center flex gap-1"
      >
        <Undo2 className="inline ml-1" />
        Back
      </Link>
      <form
        className="flex flex-col items-center justify-center w-3/5 min-w-3xs h-full gap-4"
        onSubmit={handleLogin}
      >
        <h1 className="text-4xl font-bold">Login</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          name="submit"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
