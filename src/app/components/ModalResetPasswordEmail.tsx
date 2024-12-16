import React, { useState } from "react";
import { z } from "zod";
import { resetPasswordSchema } from "@/app/schemas/loginSchema";
import { getVercelUrlWithoutRequest } from "../utils/vercelUrl";
import { resetPassword } from "../utils/sendToUser";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      const resetData = resetPasswordSchema.parse({ email });

      const resetUrl = `${getVercelUrlWithoutRequest()}/reset-password?email=${encodeURIComponent(
        resetData.email
      )}`;

      await resetPassword(resetData.email, resetUrl);
      setEmail("");
      onClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors.map((e) => e.message).join(", "));
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-1/3 text-center">
        <h2 className="text-lg font-bold mb-4">שחזור סיסמה</h2>
        <p className="mb-2">אנא הזן את הדואר האלקטרוני שלך לקבלת קישור לאיפוס סיסמה:</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded w-full p-2 mb-4"
          placeholder="דוא״ל"
        />
        {error && <p className="text-red-700 m-2">{error}</p>}
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
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
          בטל
        </button>
      </div>
    </div>
  );
};

export default PasswordResetModal;
