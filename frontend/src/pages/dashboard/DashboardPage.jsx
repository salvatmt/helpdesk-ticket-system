import {
  useEffect,
  useState
} from "react";

import {
  obtenerDashboard
} from "../../services/dashboard.service";

import {
  useAuth
} from "../../hooks/useAuth";


function DashboardPage() {

  const { token } = useAuth();

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const cargarDashboard = async () => {

      try {

        const data = await obtenerDashboard(token);

        setDashboard(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    cargarDashboard();

  }, []);


  if (loading) {

    return (
      <p>Cargando dashboard...</p>
    );
  }


  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>


      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500">
            Total Tickets
          </h2>

          <p className="text-4xl font-bold mt-2">
            {dashboard.total_tickets}
          </p>

        </div>


        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500">
            Tickets Abiertos
          </h2>

          <p className="text-4xl font-bold mt-2">
            {dashboard.tickets_abiertos}
          </p>

        </div>


        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-gray-500">
            Tickets Resueltos
          </h2>

          <p className="text-4xl font-bold mt-2">
            {dashboard.tickets_resueltos}
          </p>

        </div>

      </div>


      {/* TICKETS RECIENTES */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Tickets recientes
        </h2>

        <div className="space-y-4">

          {
            dashboard.tickets_recientes.map((ticket) => (

              <div
                key={ticket.id}
                className="border p-4 rounded-lg"
              >

                <h3 className="font-semibold">
                  {ticket.titulo}
                </h3>

                <p className="text-sm text-gray-500">
                  Estado: {ticket.estado}
                </p>

                <p className="text-sm text-gray-500">
                  Prioridad: {ticket.prioridad}
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;