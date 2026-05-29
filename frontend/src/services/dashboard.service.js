import api from "../api/axios";


export const obtenerDashboard = async (token) => {

  const response = await api.get(
    "/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};