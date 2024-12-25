"use client";
import React, { useEffect } from "react";
import userStore from "../store/userStore";
import { getAlertById, updateAlertById } from "../services/api/alertService";
import { Alert } from "../types/props/alert";

export const Alerts = () => {
  const currentUser = userStore((state) => state.user);
  const alerts = userStore((state) => state.alerts);
  const setAlerts = userStore((state) => state.setAlerts);
  const getAlerts = userStore((state) => state.getAlerts);

  useEffect(() => {
    getAlerts();
  }, []);

  const markAsRead = async (alert: Alert) => {
    try {
      await updateAlertById(alert._id.toString(), { ...alert, read: true });

      // Update global store alerts
      setAlerts(
        alerts!.map((alertItem) =>
          alertItem._id === alert._id ? { ...alertItem, read: true } : alertItem
        )
      );
    } catch (error) {
      console.error("Error marking alert as read:", error);
    }
  };

  if (!alerts) {
    return <p>Loading alerts...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center ">התראות</h2>
        {alerts.length > 0 ? (
          <div className="space-y-4 mt-2 text-center">
            {alerts.map((alert) => (
              <div
                key={alert._id?.toString()}
                className={`border border-gray-200 p-4 rounded-md bg-gray-100  ${
                  alert.read ? "" : "border-2 border-solid border-primary"
                }`}
              >
                <p className="text-black">{alert.message}</p>
                {!alert.read ? (
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm cursor-pointer bg-primary text-white`}
                    onClick={() => markAsRead(alert)}
                  >
                    סמן כנקרא
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">לא נמצאו התראות.</p>
        )}
      </div>
    </div>
  );
};
