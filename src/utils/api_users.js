import axios from "axios";

import { API_URL } from "./constants";

export const login = async (email, password) => {
  const response = await axios.post(API_URL + "users/login", {
    email,
    password,
  });
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await axios.post(API_URL + "users/signup", {
    name,
    email,
    password,
  });
  return response.data;
};

export async function getUsers(){
  const response = await axios.get(API_URL + "users",)
    return response.data;
};

export async function getUserById(id){
  const response = await axios.get(API_URL + "users/" + id,)
    return response.data;
}

export async function editUser(id, name, email, role, token){
  const response = await axios.put(API_URL + "users/" + id,
    {
        name,
        email,
        role
    },
    {
      headers: {
        Authorization: "Bearer " + token,
        // to verify that the user is valid
      },
    }
    );
  return response.data;
}

export async function deleteUser(id, token){
  const response = await axios.delete(API_URL + "users/" + id,
    {
      headers: {
        Authorization: "Bearer " + token,
        // to verify that the user is valid
      },
    }
    );
  return response.data;
}