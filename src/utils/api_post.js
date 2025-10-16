import axios from "axios";

import { API_URL } from "./constants";


export const getPosts = async (category, sortBy, search) => {
  const response = await axios.get(
    API_URL +
      "posts" +
      "?" + // start query string properly
      "sortBy=" + sortBy +
      (category === "all" ? "" : "&category=" + category) +
      (search ? "&search=" + encodeURIComponent(search) : "")
  );
  return response.data;
};

export const getPost = async (id) => {
    const response = await axios.get(API_URL + "posts/" + id);
    return response.data;
}


export const addPosts = async (
    title,
    content,
    category, 
    attachments,
    token
) => {
  const response = await axios.post(
    API_URL + "posts",
    {
        title: title,
        content: content,
        category: category,
        attachments: attachments
    },
    {
      headers: {
        Authorization: "Bearer " + token,
        // Bearer jdke0fje00ifi0o...
      },
    }
  );
  return response.data;
}


export const updatePost = async(
    id,
    title,
    content,
    category, 
    attachments,
    token
) => {
  // PUT http://localhost:5123/posts/68a56c5c2a01f899adb75255
  const response = await axios.put(
    API_URL + "posts/" + id,
    {
        title: title,
        content: content,
        category: category,
        attachments: attachments
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export const deletePost = async (id, token) => {
  // DELETE http://localhost:5123/posts/68a56c5c2a01f899adb75255
  const response = await axios.delete(API_URL + "posts/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export const toggleLikePost = async (postId, token) => {
  try {
    const response = await axios.patch(
      API_URL + "posts/" + postId + "/like",
      {}, // body is empty
      {
        headers: {
          Authorization: `Bearer ${token}`, // pass token
        },
      }
    );
    return response.data; // returns the updated post
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};