import api from "../api/axios";


// Obtener tickets
export const obtenerTickets = async (token) => {

  const response = await api.get(
    "/tickets",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};


// Crear ticket
export const crearTicketRequest = async (
  token,
  data
) => {

  const response = await api.post(
    "/tickets",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};