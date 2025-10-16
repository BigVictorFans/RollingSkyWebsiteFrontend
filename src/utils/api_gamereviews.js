import axios from "axios";
import { API_URL } from "./constants";

// Get all game reviews (with optional rating filter)
export const getGameReviews = async (rating) => {
  const response = await axios.get(
    API_URL + "gamereviews?rating=" + rating
  );
  return response.data;
};

// Get a single game review by ID
export const getGameReview = async (id) => {
  const response = await axios.get(API_URL + "gamereviews/" + id);
  return response.data;
};

// Add a new game review (user must be logged in)
export const addGameReview = async (title, content, rating, token) => {
  const response = await axios.post(
    API_URL + "gamereviews",
    {
      title,
      content,
      rating,
    },
    {
      headers: {
        Authorization: "Bearer " + token, // Include the token for authorization
      },
    }
  );
  return response.data;
};

// Update an existing game review by ID (only the owner can update)
export const updateGameReview = async (id, title, content, rating, token) => {
  const response = await axios.put(
    API_URL + "gamereviews/" + id,
    {
      title,
      content,
      rating,
    },
    {
      headers: {
        Authorization: "Bearer " + token, // Include the token for authorization
      },
    }
  );
  return response.data;
};

// Delete a game review by ID (only the owner can delete)
export const deleteGameReview = async (id, token) => {
  const response = await axios.delete(API_URL + "gamereviews/" + id, {
    headers: {
      Authorization: "Bearer " + token, // Include the token for authorization
    },
  });
  return response.data;
};