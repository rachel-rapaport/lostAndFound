import axios from "axios";
import { Alert } from "../types/alert";

// get all alerts
export const getAlerts = async () => {
  try {
    const response = await axios.get("/api/alert",{
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting alerts:", error);
    throw error;
  }
};



// get alert by id
export const getAlertById = async (id: string) => {
  try {
    const response = await axios.get(`/api/alert/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting alert:", error);
    throw error;
  }
};

// create new alert
export const createAlert = async (alert: Alert) => {
  try {
    const response = await axios.post("/api/alert", alert);
    return response.data;
  } catch (error) {
    console.log("Error creating alert:", error);
    throw error;
  }
};

// update alert by id
export const updateAlertById = async (id: string, alert: Alert) => {
  try {
    const response = await axios.put(`/api/alert/${id}`, alert);
    return response.data;
  } catch (error) {
    console.log("Error updating alert:", error);
    throw error;
  }
};


// delete alert by id
export const deleteAlertById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/alert/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting alert", error);
    throw error;
  }
};