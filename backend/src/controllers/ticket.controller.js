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


export const obtenerTodosTickets = async (req, res) => {

  try {

    const tickets = await pool.query(
      `
      SELECT

        tickets.id,
        tickets.titulo,
        tickets.descripcion,
        tickets.creado_en,

        usuarios.nombre AS usuario,

        tecnico.nombre AS tecnico,

        prioridades.nombre AS prioridad,

        estados.nombre AS estado

      FROM tickets

      JOIN usuarios
      ON tickets.usuario_id = usuarios.id

      LEFT JOIN usuarios AS tecnico
      ON tickets.tecnico_id = tecnico.id

      JOIN prioridades
      ON tickets.prioridad_id = prioridades.id

      JOIN estados
      ON tickets.estado_id = estados.id

      ORDER BY tickets.creado_en DESC
      `
    );

    res.json(tickets.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};

export const asignarTicket = async (req, res) => {

  try {

    const ticketId = req.params.id;

    // Técnico autenticado
    const tecnico_id = req.usuario.id;

    // Estado en_proceso = 2
    const estado_id = 2;

    // Verificar ticket existe
    const ticketExiste = await pool.query(
      `
      SELECT * FROM tickets
      WHERE id = $1
      `,
      [ticketId]
    );

    if (ticketExiste.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Ticket no encontrado"
      });
    }

    // Actualizar ticket
    const ticketActualizado = await pool.query(
      `
      UPDATE tickets

      SET
        tecnico_id = $1,
        estado_id = $2,
        actualizado_en = CURRENT_TIMESTAMP

      WHERE id = $3

      RETURNING *
      `,
      [
        tecnico_id,
        estado_id,
        ticketId
      ]
    );

    res.json({
      mensaje: "Ticket asignado correctamente",
      ticket: ticketActualizado.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};

export const cambiarEstadoTicket = async (req, res) => {

  try {

    const ticketId = req.params.id;

    const { estado_id } = req.body;

    // Verificar ticket
    const ticketExiste = await pool.query(
      `
      SELECT * FROM tickets
      WHERE id = $1
      `,
      [ticketId]
    );

    if (ticketExiste.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Ticket no encontrado"
      });
    }

    // Actualizar estado
    const ticketActualizado = await pool.query(
      `
      UPDATE tickets

      SET
        estado_id = $1,
        actualizado_en = CURRENT_TIMESTAMP

      WHERE id = $2

      RETURNING *
      `,
      [estado_id, ticketId]
    );

    res.json({
      mensaje: "Estado actualizado correctamente",
      ticket: ticketActualizado.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};