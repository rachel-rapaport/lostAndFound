import { Alert } from "@/app/types/props/alert";
import axios from "axios";

// create new alert
export const createAlert = async (userId: string, massage: string) => {
  try {
    const newAlert = {
      message: massage,
      userId: userId,
      read: false,
    };
    const response = await axios.post("/api/alert", newAlert);

    return response.data;
  } catch (error) {
    console.log("Error creating alert:", error);
    throw error;
  }
};

// get alert by id
export const getAlertById = async (id: string) => {
  try {
    const response = await axios.get(`/api/alert/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting alert:", error);
    throw error;
  }
};

// update alert by id
export const updateAlertById = async (id: string, alert: Alert) => {
  try {
    const response = await axios.put(`/api/alert/${id}`, alert);
    return response.data.data;
  } catch (error) {
    console.log("Error updating color:", error);
    throw error;
  }
};
