import axios from "axios";
import { API_URL } from "./constants";


// Get all comments for a specific post by post ID
export const getComments = async (postId) => {
  const response = await axios.get(API_URL + "posts/" + postId + "/comments");
  return response.data;
};

// Get a single comment by ID
export const getComment = async (postId, id) => {
  const response = await axios.get(API_URL + "posts/" + postId + "/comments/" + id);
  return response.data;
};

// Add a new comment to a post (user must be logged in)
export const addComment = async (postId, content, token) => {
  const response = await axios.post(
    API_URL + "posts/" + postId + "/comments",
    { content },
    {
      headers: {
        Authorization: "Bearer " + token, // Include the token for authorization
      },
    }
  );
  return response.data;
};

// Update an existing comment by ID (only owner can edit)
export const updateComment = async (postId, id, content, token) => {
  const response = await axios.put(
    API_URL + "posts/" + postId + "/comments/" + id,
    { 
        content 
    },
    {
      headers: {
        Authorization: "Bearer " + token, // Include the token for authorization
      },
    }
  );
  return response.data;
};

// Delete a comment by ID (only the owner or admin can delete)
export const deleteComment = async (postId, id, token) => {
  const response = await axios.delete(API_URL + "posts/" + postId + "/comments/" + id, {
    headers: {
      Authorization: "Bearer " + token, // Include the token for authorization
    },
  });
  return response.data;
};
