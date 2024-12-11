// Login / sign up form - include gorgot password and token
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { loginAuthenticationCookies } from "../services/loginAuth";
import { signupAuthenticationCookies } from "../services/signupAuth";
import { sendEmailTo } from "../services/resetPassword";

const LoginForm = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    //  Make an API request to check if the token is valid
    axios
      .get(`${baseUrl}/api/check-token`)
      .then((response) => {
        console.log("Token is valid:", response.data);
        router.replace("/home"); // Redirect to home if valid
      })
      .catch((error) => {
        console.log("No valid token:", error.response?.data?.message);
        router.replace("/login"); // Redirect to login if invalid or missing
      });
  }, [router, baseUrl]);

  // Log in / Sign up
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  // send reset password email modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login();
    } else {
      await signUp();
    }
  };

  // handle sign up
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

  // handle log in
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

  // clear form
  const clearData = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setError("");
    setIsLogin(false);
  };

  // error handler
  const handleError = (error: unknown, defaultMessage: string) => {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      setError(error.response.data.message || defaultMessage);
      setIsLogin(true);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // handle email sender modal
  const handleResetPassword = async () => {
    const resetUrl = `${baseUrl}/reset-password?email=${encodeURIComponent(
      resetEmail
    )}`;

    const sendEmail = await sendEmailTo(resetEmail, resetUrl);
    console.log(sendEmail);
    console.log("Password reset email sent to:", email);
    setResetEmail("");
    closeModal();
    clearData();
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
            required={!isModalOpen}
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
        {isLogin ? (
          <>
            {" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
              className="text-blue-500 underline"
            >
              שכחת סיסמה?
            </a>
          </>
        ) : (
          <></>
        )}
        {!isModalOpen ? (
          <>
            <button className="w-full bg-green-600 text-white py-2 mt-4 rounded">
              {isLogin ? "התחברות" : "הרשמה"}
            </button>
            {error && <p className="text-red-700 mt-4">{error}</p>}
          </>
        ) : null}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-1/3 text-center">
              <h2 className="text-lg font-bold mb-4">שחזור סיסמה</h2>
              <p className="mb-4">
                אנא הזן את הדואר האלקטרוני שלך לקבלת קישור לאיפוס סיסמה:
              </p>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="border border-gray-300 rounded w-full p-2 mb-4"
                placeholder="דוא״ל"
              />
              <button
                onClick={handleResetPassword}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                שלח
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                בטל
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
