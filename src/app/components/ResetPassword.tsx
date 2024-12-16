// Form to reset the user account password- get and and upadte
"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getUserByEmail, updateUserById } from "../services/api/userService";
import { User } from "../types/props/user";
import { resetPasswordSchema } from "../schemas/resetPasswordSchema";

export const ResetPassword: React.FC<{ email: string }> = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [success, setSuccess] = useState("");



  // const queryFn = email ? () => getUserByEmail(email) : null;
 
  // get the user by email
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", email], // Query key as an object property
    queryFn: () => getUserByEmail(email), // Fetch function
    enabled: !!email, // Runs only if email is truthy
  });

  useEffect(() => {
    if (data) {
      setUser(data); // Assuming `data` is the user object
    }
  }, [data]);

  if (!email) return <div>An error occured. No Email provided.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords
    const formData = { password, confirmPassword };
    const validation = resetPasswordSchema.safeParse(formData);

    if (!validation.success) {
      const errors = validation.error.errors;
      setErrorMessage(errors[0].message); // Display the first error message
      return;
    }
    if (!user || !user._id) {
      setErrorMessage("המשתמש לא נמצא או נתוני המשתמש לא חוקיים.");
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
      setErrorMessage("");
    } catch (err) {
      console.error("Error updating password:", err);
      setErrorMessage("שגיאה בעדכון הסיסמה. נסה שוב.");
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
        {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}
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
