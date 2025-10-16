import axios from "axios";

import { API_URL } from "./constants";

// Get all reviews for a specific level
export const getReviewsByLevel = async (levelId) => {
  const response = await axios.get(API_URL + "levels/" + levelId + "/reviews");
  return response.data;
};

export const getReview = async (levelId, id) => {
  const response = await axios.get(API_URL + "levels/" + levelId + "/reviews/" + id);
  return response.data;
};

// Add a new review for a level
export const addReview = async (
  levelId, 
  content, 
  fanDifficultyBase, 
  fanDifficultyPerfect, 
  token
) => {
  const response = await axios.post(
    API_URL + "levels/" + levelId + "/reviews", 
    {
      content,
      fanDifficultyBase,
      fanDifficultyPerfect,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

// Update a review (only owner can edit)
export const updateReview = async (
  levelId, 
  id, 
  content, 
  fanDifficultyBase, 
  fanDifficultyPerfect, 
  token
) => {
  const response = await axios.put(
    API_URL + "levels/" + levelId + "/reviews/" + id, 
    {
      content,
      fanDifficultyBase,
      fanDifficultyPerfect,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

// Delete a review (owner or admin)
export const deleteReview = async (levelId, id, token) => {
  const response = await axios.delete(
    API_URL + "levels/" + levelId + "/reviews/" + id, 
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};
