"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { loginAuthenticationCookies } from "../services/loginAuth";
import { signupAuthenticationCookies } from "../services/signupAuth";

const LoginForm = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    //  Make an API request to check if the token is valid
    axios
      .get("/api/check-token") 
      .then((response) => {
        console.log("Token is valid:", response.data);
        router.replace("/home"); // Redirect to home if valid
      })
      .catch((error) => {
        console.log("No valid token:", error.response?.data?.message);
        router.replace("/login"); // Redirect to login if invalid or missing
      });
  }, [router]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login();
    } else {
      await signUp();
    }
  };

  const signUp = async () => {
    try {
      const response = await signupAuthenticationCookies(
        email,
        phone,
        fullName,
        password
      );
      if (response) {
        console.log("sign up succsess");
        clearData();
        router.replace("/home");

      } else {
        setError("error");
      }
    } catch (error) {
      handleError(error, "Account creation failed.");
    }
  };

  const login = async () => {
    try {
      const response = await loginAuthenticationCookies(email, password);
      if (response) {
        console.log("log in succsess");
        if (router) {
          router.push("/home");
        }
        clearData();
      } else {
        setError("password or email are wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setError("");
    setIsLogin(false);
  };

  const handleError = (error: unknown, defaultMessage: string) => {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      setError(error.response.data.message || defaultMessage);
      setIsLogin(true);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 space-y-12 w-full h-[400px] text-black p-8">
      <div className="flex justify-center  space-x-4 mb-6">
        <button
          onClick={toggleForm}
          className={`px-6 py-2 text-xl font-semibold ${
            isLogin
              ? "bg-green-600 text-white rounded-t-lg"
              : "bg-transparent text-green-600 border-b-2 border-green-600"
          }`}
        >
          התחברות
        </button>
        <button
          onClick={toggleForm}
          className={`px-6 py-2 text-xl font-semibold ${
            !isLogin
              ? "bg-green-600 text-white rounded-t-lg"
              : "bg-transparent text-green-600 border-b-2 border-green-600"
          }`}
        >
          הרשמה
        </button>
      </div>

      <form onSubmit={onSubmit}>
        {!isLogin && (
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="fullname">שם מלא:</label>
            <input
              className="w-full"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="username"
              type="text"
            />
          </div>
        )}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">דואר אלקטרוני:</label>
          <input
            className="w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        {!isLogin && (
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="phone"> טלפון:</label>
            <input
              className="w-full"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              type="text"
            />
          </div>
        )}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="password">סיסמה:</label>
          <input
            className="w-full"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </div>
        <button className="w-full bg-green-600 text-white py-2 mt-4 rounded">
          {isLogin ? "התחברות" : "הרשמה"}
        </button>
        {error && <p className="text-red-700 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;