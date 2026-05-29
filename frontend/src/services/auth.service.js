import api from "../api/axios";


// LOGIN
export const loginRequest = async (data) => {

  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};


// REGISTRO
export const registerRequest = async (data) => {

  const response = await api.post(
    "/auth/registro",
    data
  );

  return response.data;
};