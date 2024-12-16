// Login / sign up form - include forgot password and token
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { loginAuthenticationCookies } from "../services/api/loginAuth";
import { signupAuthenticationCookies } from "../services/api/signupAuth";
import { getVercelUrlWithoutRequest } from "../utils/vercelUrl";
import { resetPassword } from "../utils/sendToUser";
import useUserStore from "@/app/store/userStore";
import { z } from "zod";
import {
  loginSchema,
  signUpSchema,
  resetPasswordSchema,
} from "@/app/schemas/loginSchema";

const LoginForm = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalError, setModalError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

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
    try {
      const formData = { email, password, fullName, phone };
      if (isLogin) {
        const loginData = loginSchema.parse({ email, password });
        await login(loginData);
      } else {
        const signUpData = signUpSchema.parse(formData);
        await signUp(signUpData);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  // handle sign up
  const signUp = async (signUpData: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
  }) => {
    try {
      const response = await signupAuthenticationCookies(
        signUpData.email,
        signUpData.phone,
        signUpData.fullName,
        signUpData.password
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
  const login = async (loginData: { email: string; password: string }) => {
    try {
      const response = await loginAuthenticationCookies(
        loginData.email,
        loginData.password
      );

      if (response) {
        if (response.user) {
          console.log(response.user);

          // the user logged in successfully
          setUser(response.user); // Update the store with user data
          console.log("Login success");

          if (router) {
            router.push("/home");
          }
          clearData();
        } else {
          // the user is logged in already
          console.log("State after first login:", user);

          if (router) {
            router.push("/home");
          }
        }
      } else {
        setError("Password or email is incorrect");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login");
    }
  };

  // clear form
  const clearData = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setError("");
    setPhone("");
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
    try {
      const resetData = resetPasswordSchema.parse({ email: resetEmail });

      const resetUrl = `${getVercelUrlWithoutRequest()}/reset-password?email=${encodeURIComponent(
        resetData.email
      )}`;

      resetPassword(resetData.email, resetUrl);
      setResetEmail("");
      closeModal();
      clearData();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setModalError(error.errors.map((e) => e.message).join(", "));
      } else {
        setModalError("An unexpected error occurred.");
      }
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
              required={!isModalOpen}
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
            type="text"
          />
        </div>
        {!isLogin && (
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="phone"> טלפון:</label>
            <input
              className="w-full"
              required={!isModalOpen}
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
            required={!isModalOpen}
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
              <p className="mb-2">
                אנא הזן את הדואר האלקטרוני שלך לקבלת קישור לאיפוס סיסמה:
              </p>
              <input
                type="text"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="border border-gray-300 rounded w-full p-2 mb-4"
                placeholder="דוא״ל"
              />
              {modalError && <p className="text-red-700 m-2">{modalError}</p>}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleResetPassword();
                }}
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
