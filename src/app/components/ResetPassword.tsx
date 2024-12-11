// Form to reset the user account password- get and and upadte
"use client";
// import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUserByEmail, updateUserById } from "../services/api/userService";
import { User } from "../types/props/user";
interface ResetPasswordProps {
  email: string;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [success, setSuccess] = useState("");

  // // email params - dynamic route
  // const searchParams = useSearchParams();
  // const email = searchParams.get("email");

  // get the user by email
  useEffect(() => {
    const fetchUser = async () => {
      if (email) {
        try {
          const response = await getUserByEmail(email);
          setUser(response);
        } catch (err) {
          setError("המשתמש לא נמצא. וודא שהקישור תקין.");
          console.log(err);
        }
      } else {
        setError("הירשם תחילה לאתר.");
      }
    };

    fetchUser();
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות.");
      return;
    }

    if (!user || !user._id) {
      setError("המשתמש לא נמצא או נתוני המשתמש לא חוקיים.");
      return;
    }

    try {
      // Update user password
      const updatedUser = await updateUserById(user._id.toString(), {
        ...user,
        password,
      });

      console.log("Updated User:", updatedUser);

      setSuccess("הסיסמה עודכנה בהצלחה. ");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      console.error("Error updating password:", err);
      setError("שגיאה בעדכון הסיסמה. נסה שוב.");
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded shadow-lg max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">איפוס סיסמה</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
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
