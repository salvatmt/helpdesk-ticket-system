import StatusBadge from "../../components/tickets/StatusBadge";

import PriorityBadge from "../../components/tickets/PriorityBadge";

import { toast } from "react-toastify";


import {
  useEffect,
  useState
} from "react";

import {
  useAuth
} from "../../hooks/useAuth";

import {
  obtenerTickets,
  crearTicketRequest
} from "../../services/ticket.service";


function TicketsPage() {

  const { token } = useAuth();

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    prioridad_id: 1
  });


  // =====================================
  // CARGAR TICKETS
  // =====================================

  const cargarTickets = async () => {

    try {

      const data = await obtenerTickets(token);

      setTickets(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    cargarTickets();

  }, []);


  // =====================================
  // HANDLE INPUTS
  // =====================================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  // =====================================
  // CREAR TICKET
  // =====================================

  const handleSubmit = async (e) => {

    toast.success(
  "Ticket creado correctamente"
);
    e.preventDefault();

    try {

      await crearTicketRequest(
        token,
        form
      );

      setForm({
        titulo: "",
        descripcion: "",
        prioridad_id: 1
      });

      cargarTickets();

    } catch (error) {

      toast.error(
  "No se pudo crear el ticket"
);
    }
  };


  if (loading) {

    return <p>Cargando tickets...</p>;
  }


  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Tickets
      </h1>


      {/* FORMULARIO */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >

        <h2 className="text-2xl font-bold mb-4">
          Crear Ticket
        </h2>

        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <select
          name="prioridad_id"
          value={form.prioridad_id}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        >

          <option value={1}>
            Baja
          </option>

          <option value={2}>
            Media
          </option>

          <option value={3}>
            Alta
          </option>

        </select>

        <button
          className="bg-black text-white px-6 py-3 rounded"
        >
          Crear Ticket
        </button>

      </form>


      {/* TABLA TICKETS */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Título
              </th>

              <th className="p-4 text-left">
                Estado
              </th>

              <th className="p-4 text-left">
                Prioridad
              </th>

              <th className="p-4 text-left">
                Técnico
              </th>

            </tr>

          </thead>

          <tbody>

            {
              tickets.map((ticket) => (

                <tr
                  key={ticket.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {ticket.titulo}
                  </td>

                  <td className="p-4">

  <StatusBadge
    estado={ticket.estado}
  />

</td>

<td className="p-4">

  <PriorityBadge
    prioridad={ticket.prioridad}
  />

</td>

                  <td className="p-4">
                    {ticket.tecnico || "Sin asignar"}
                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TicketsPage;