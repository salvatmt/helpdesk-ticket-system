import { pool } from "../config/db.js";


// =====================================
// ESTADISTICAS DASHBOARD
// =====================================

export const obtenerEstadisticas = async (req, res) => {

  try {

    // Total tickets
    const totalTickets = await pool.query(
      `
      SELECT COUNT(*) FROM tickets
      `
    );

    // Tickets abiertos
    const ticketsAbiertos = await pool.query(
      `
      SELECT COUNT(*)

      FROM tickets

      WHERE estado_id = 1
      `
    );

    // Tickets resueltos
    const ticketsResueltos = await pool.query(
      `
      SELECT COUNT(*)

      FROM tickets

      WHERE estado_id = 3
      `
    );

    // Tickets por prioridad
    const ticketsPorPrioridad = await pool.query(
      `
      SELECT

        prioridades.nombre,

        COUNT(*) as total

      FROM tickets

      JOIN prioridades
      ON tickets.prioridad_id = prioridades.id

      GROUP BY prioridades.nombre
      `
    );

    // Tickets recientes
    const ticketsRecientes = await pool.query(
      `
      SELECT

        tickets.id,

        tickets.titulo,

        estados.nombre AS estado,

        prioridades.nombre AS prioridad,

        tickets.creado_en

      FROM tickets

      JOIN estados
      ON tickets.estado_id = estados.id

      JOIN prioridades
      ON tickets.prioridad_id = prioridades.id

      ORDER BY tickets.creado_en DESC

      LIMIT 5
      `
    );

    res.json({

      total_tickets:
        totalTickets.rows[0].count,

      tickets_abiertos:
        ticketsAbiertos.rows[0].count,

      tickets_resueltos:
        ticketsResueltos.rows[0].count,

      tickets_por_prioridad:
        ticketsPorPrioridad.rows,

      tickets_recientes:
        ticketsRecientes.rows
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};