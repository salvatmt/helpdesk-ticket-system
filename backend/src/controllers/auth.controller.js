import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const registro = async (req, res) => {
  try {

    const { nombre, email, password } = req.body;

    // Verificar si usuario existe
    const usuarioExistente = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({
        mensaje: "El usuario ya existe"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    // Rol usuario por defecto = 3
    const nuevoUsuario = await pool.query(
      `
      INSERT INTO usuarios
      (nombre, email, password, rol_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, email
      `,
      [nombre, email, passwordHash, 3]
    );

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevoUsuario.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Buscar usuario
    const resultado = await pool.query(
      `
      SELECT usuarios.*, roles.nombre AS rol
      FROM usuarios
      JOIN roles ON usuarios.rol_id = roles.id
      WHERE email = $1
      `,
      [email]
    );

    if (resultado.rows.length === 0) {
      return res.status(400).json({
        mensaje: "Credenciales inválidas"
      });
    }

    const usuario = resultado.rows[0];

    // Comparar password
    const passwordValido = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Credenciales inválidas"
      });
    }

    // Crear token
    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor"
    });
  }
};