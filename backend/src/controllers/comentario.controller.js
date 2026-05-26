import { pool } from "../config/db.js";


// =====================================
// CREAR COMENTARIO
// =====================================

export const crearComentario = async (req, res) => {

  try {

    const ticket_id = req.params.ticketId;

    const usuario_id = req.usuario.id;

    const { contenido } = req.body;

    // Verificar ticket
    const ticketExiste = await pool.query(
      `
      SELECT * FROM tickets
      WHERE id = $1
      `,
      [ticket_id]
    );

    if (ticketExiste.rows.length === 0) {

      return res.status(404).json({
        mensaje: "Ticket no encontrado"
      });
    }

    // Crear comentario
    const nuevoComentario = await pool.query(
      `
      INSERT INTO comentarios
      (
        ticket_id,
        usuario_id,
        contenido
      )

      VALUES ($1, $2, $3)

      RETURNING *
      `,
      [
        ticket_id,
        usuario_id,
        contenido
      ]
    );

    res.status(201).json({
      mensaje: "Comentario agregado",
      comentario: nuevoComentario.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};

export const obtenerComentarios = async (req, res) => {

  try {

    const ticket_id = req.params.ticketId;

    const comentarios = await pool.query(
      `
      SELECT

        comentarios.id,

        comentarios.contenido,

        comentarios.creado_en,

        usuarios.nombre

      FROM comentarios

      JOIN usuarios
      ON comentarios.usuario_id = usuarios.id

      WHERE ticket_id = $1

      ORDER BY comentarios.creado_en ASC
      `,
      [ticket_id]
    );

    res.json(comentarios.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};