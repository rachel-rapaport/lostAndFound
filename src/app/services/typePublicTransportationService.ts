import axios from "axios";
import { TypePublicTransport } from "../types/typePublicTransport";

// get all types of public transporations
export const getTypePublicTransportations = async () => {
  try {
    const response = await axios.get("/api/typePublicTransportation",{
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting types of public transporations:", error);
    throw error;
  }
};

// get type of public transporation by id
export const getTypePublicTransportationById = async (id: string) => {
  try {
    const response = await axios.get(`/api/typePublicTransportation/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting type of public transporation:", error);
    throw error;
  }
};

// create new type of public transporation
export const createTypePublicTransportation = async (typePublicTransportation: TypePublicTransport) => {
  try {
    const response = await axios.post("/api/typePublicTransportation", typePublicTransportation);
    return response.data;
  } catch (error) {
    console.log("Error creating type of public transporation:", error);
    throw error;
  }
};

// update type of public transporation by id
export const updateTypePublicTransportationById = async (id: string, typePublicTransportation: TypePublicTransport) => {
  try {
    const response = await axios.put(`/api/typePublicTransportation/${id}`, typePublicTransportation);
    return response.data;
  } catch (error) {
    console.log("Error updating type of public transporation:", error);
    throw error;
  }
};


// delete type of public transporation by id
export const deleteTypePublicTransportationById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/typePublicTransportation/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting type of public transporation", error);
    throw error;
  }
};