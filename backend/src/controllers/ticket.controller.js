import { pool } from "../config/db.js";


// =====================================
// CREAR TICKET
// =====================================

export const crearTicket = async (req, res) => {

  try {

    const {
      titulo,
      descripcion,
      prioridad_id
    } = req.body;

    // Usuario autenticado
    const usuario_id = req.usuario.id;

    // Estado por defecto = abierto
    const estado_id = 1;

    const nuevoTicket = await pool.query(
      `
      INSERT INTO tickets
      (
        titulo,
        descripcion,
        usuario_id,
        prioridad_id,
        estado_id
      )

      VALUES ($1, $2, $3, $4, $5)

      RETURNING *
      `,
      [
        titulo,
        descripcion,
        usuario_id,
        prioridad_id,
        estado_id
      ]
    );

    res.status(201).json({
      mensaje: "Ticket creado correctamente",
      ticket: nuevoTicket.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};



// =====================================
// OBTENER MIS TICKETS
// =====================================

export const obtenerMisTickets = async (req, res) => {

  try {

    const usuario_id = req.usuario.id;

    const tickets = await pool.query(
      `
      SELECT
        tickets.id,
        tickets.titulo,
        tickets.descripcion,
        tickets.creado_en,

        prioridades.nombre AS prioridad,

        estados.nombre AS estado

      FROM tickets

      JOIN prioridades
      ON tickets.prioridad_id = prioridades.id

      JOIN estados
      ON tickets.estado_id = estados.id

      WHERE usuario_id = $1

      ORDER BY tickets.creado_en DESC
      `,
      [usuario_id]
    );

    res.json(tickets.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};