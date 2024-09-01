import axios from "axios";

axios.defaults.withCredentials = true;

//const API_BACKEND_URL = process.env.REACT_APP_API_URL;
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
console.log("Backend URL:", BACKEND_URL);
export const API_URL = `${BACKEND_URL}/api/users/`;

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get login status
const getLoginStatus = async () => {
    const response = await axios.get(`${API_URL}getLoginStatus`, {
      withCredentials: true,
    });
    return response.data; 
};

const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}logout`, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    throw error;
  }
};

//get user
const getUser = async () => {
  const response = await axios.get(`${API_URL}getUser`, {
    withCredentials: true,
  });
  return response.data; 
};

//update User
const updateUser = async (userData) => {
  const response = await axios.patch(`${API_URL}updateUser`, userData, {
    withCredentials: true,
  });
  return response.data; 
};

//update photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(`${API_URL}updatePhoto`, userData, {
    withCredentials: true,
  });
  return response.data; 
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  updatePhoto,
};

export default authService;
