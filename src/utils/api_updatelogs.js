import axios from "axios";
import { API_URL } from "./constants";

// Get all update logs
export const getUpdateLogs = async () => {
  const response = await axios.get(API_URL + "updatelogs");
  return response.data;
};

// Get a single update log by ID
export const getUpdateLog = async (id) => {
  const response = await axios.get(API_URL + "updatelogs/" + id);
  return response.data;
};

// Add a new update log (Admin only)
export const addUpdateLog = async (version, content, date, token) => {
  const response = await axios.post(
    API_URL + "updatelogs",
    {
      version,
      content,
      date,
    },
    {
      headers: {
        Authorization: "Bearer " + token, // Include the token for authorization
      },
    }
  );
  return response.data;
};

// Update an existing update log by ID (Admin only)
export const updateUpdateLog = async (id, version, content, date, token) => {
  const response = await axios.put(
    API_URL + "updatelogs/" + id,
    {
      version,
      content,
      date,
    },
    {
      headers: {
        Authorization: "Bearer " + token, // Include the token for authorization
      },
    }
  );
  return response.data;
};

// Delete an update log by ID (Admin only)
export const deleteUpdateLog = async (id, token) => {
  const response = await axios.delete(API_URL + "updatelogs/" + id, {
    headers: {
      Authorization: "Bearer " + token, // Include the token for authorization
    },
  });
  return response.data;
};
