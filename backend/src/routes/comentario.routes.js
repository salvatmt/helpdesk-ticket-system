import { Router } from "express";

import {
  crearComentario,
  obtenerComentarios
} from "../controllers/comentario.controller.js";

import {
  verificarToken
} from "../middleware/auth.middleware.js";

const router = Router();


// Crear comentario
router.post(
  "/:ticketId",

  verificarToken,

  crearComentario
);


// Obtener comentarios
router.get(
  "/:ticketId",

  verificarToken,

  obtenerComentarios
);

export default router;