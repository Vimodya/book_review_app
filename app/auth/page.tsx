"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);

      if (response.ok) {
        localStorage.setItem("profileName", data.firstName as string);
        router.push("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);

      if (response.ok) {
        localStorage.setItem("profileName", result.firstName);
        router.push("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-0 w-[900px] h-[500px] bg-white border border-gray-300 rounded-md">
        <div className="flex flex-col items-center justify-center bg-gray-50 px-8 py-4">
          <h1 className="text-xl font-semibold text-center">
            Make things easier with an official account
          </h1>
          <h2 className="mt-4 text-2xl font-bold text-green-600">
            Welcome to NovaCart
          </h2>
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>✔ Check out faster with saved info</li>
            <li>✔ Enjoy our personalized journey</li>
            <li>✔ Keep your orders on track</li>
            <li>✔ Get loyalty discounts</li>
          </ul>
          <p className="mt-8 text-green-600 font-medium">Join with us Now</p>
        </div>

        <div className="flex flex-col items-center justify-center px-8 py-4">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 font-medium ${
                !isLogin
                  ? "text-white bg-black"
                  : "bg-gray-200 border border-black"
              } rounded-l-md focus:outline-none`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 font-medium ${
                isLogin
                  ? "text-white bg-black"
                  : "bg-gray-200 border border-black"
              } rounded-r-md focus:outline-none`}
            >
              Log In
            </button>
          </div>

          {isLogin ? (
            <form className="w-full space-y-4" onSubmit={handleLogin}>
              <input
                name="email"
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
              >
                Continue to Account
              </button>
            </form>
          ) : (
            <form className="w-full space-y-4" onSubmit={handleSignup}>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
              >
                Continue to Create
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
