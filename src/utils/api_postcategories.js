import axios from "axios";
import { API_URL } from "./constants";

// Get all categories
export const getCategories = async () => {
  const response = await axios.get(API_URL + "postcategories");
  return response.data;
};

// Get a single category by ID
export const getCategory = async (id) => {
  const response = await axios.get(API_URL + "postcategories/" + id);
  return response.data;
};

// Add a new category (Admin only)
export const addCategory = async (label, token) => {
  const response = await axios.post(
    API_URL + "postcategories",
    { label },
    {
      headers: {
        Authorization: "Bearer " + token, 
      },
    }
  );
  return response.data;
};

// Update an existing category by ID (Admin only)
export const updateCategory = async (id, label, token) => {
  const response = await axios.put(
    API_URL + "postcategories/" + id,
    { 
        label
    },
    {
      headers: {
        Authorization: "Bearer " + token, 
      },
    }
  );
  return response.data;
};

// Delete a category by ID (Admin only)
export const deleteCategory = async (id, token) => {
  const response = await axios.delete(API_URL + "postcategories/" + id, {
    headers: {
      Authorization: "Bearer " + token, 
    },
  });
  return response.data;
};
