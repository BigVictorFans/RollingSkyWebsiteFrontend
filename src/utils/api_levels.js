import axios from "axios";

import { API_URL } from "./constants";


export const getLevels = async (difficulty) => {
  const response = await axios.get(
    API_URL + 
    (difficulty ? `levels?difficulty=${difficulty}` : "levels")
);
  return response.data;
};

export const getLevel = async (id) => {
    const response = await axios.get(API_URL + "levels/" + id);
    return response.data;
}


export const addLevel = async (
    title,
    description,
    baseDifficulty,
    perfectDifficulty,
    releaseDate,
    levelThumbnail,
    token
) => {
  const response = await axios.post(
    API_URL + "levels",
    {
        title: title,
        description: description,
        baseDifficulty: baseDifficulty,
        perfectDifficulty: perfectDifficulty,
        releaseDate: releaseDate,
        levelThumbnail: levelThumbnail
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


export const updateLevel = async(
    id,
    title,
    description,
    baseDifficulty,
    perfectDifficulty,
    releaseDate,
    levelThumbnail,
    token
) => {
  // PUT http://localhost:5123/levels/68a56c5c2a01f899adb75255
  const response = await axios.put(
    API_URL + "levels/" + id,
    {
        title,
        description,
        baseDifficulty,
        perfectDifficulty,
        releaseDate,
        levelThumbnail
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export const deleteLevel = async (id, token) => {
  // DELETE http://localhost:5123/levels/68a56c5c2a01f899adb75255
  const response = await axios.delete(API_URL + "levels/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}