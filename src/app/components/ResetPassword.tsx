"use client";
import React, { useState } from "react";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות.");
      return;
    }

    if (password.length < 8) {
      setError("הסיסמה חייבת להיות לפחות 8 תווים.");
      return;
    }

    try {
      // Example: Send the password to the server for reset
      console.log("Resetting password:", password);

      // Simulate successful password reset
      setSuccess("הסיסמה עודכנה בהצלחה.");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      setError("שגיאה בעדכון הסיסמה. נסה שוב.");
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded shadow-lg max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">איפוס סיסמה</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            סיסמה חדשה:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="הזן סיסמה חדשה"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            אשר סיסמה חדשה:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="אשר את הסיסמה"
            required
          />
        </div>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          שמור סיסמה
        </button>
      </form>
    </div>
  );
};
