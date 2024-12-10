import axios from "axios";
import { User } from "../types/props/user";

// get all users
export const getUsers = async () => {
  try {
    const response = await axios.get("/api/user",{
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};



// get user by id
export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`/api/user/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// create new user
export const createUser = async (user: User) => {
  try {
    const response = await axios.post("/api/user", user);
    return response.data;
  } catch (error) {
    console.log("Error creating user:", error);
    throw error;
  }
};

// update user by id
export const updateUserById = async (id: string, user: User) => {
  try {
    const response = await axios.put(`/api/user/${id}`, user);
    return response.data;
  } catch (error) {
    console.log("Error updating user:", error);
    throw error;
  }
};


// delete user by id
export const deleteUserById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting user", error);
    throw error;
  }
};