import { Router } from "express";

import {
  crearTicket,
  obtenerMisTickets
} from "../controllers/ticket.controller.js";

import {
  verificarToken
} from "../middleware/auth.middleware.js";

import {
  verificarRol
} from "../middleware/role.middleware.js";

const router = Router();


// Crear ticket
router.post(
  "/",
  verificarToken,
  crearTicket
);


// Obtener mis tickets
router.get(
  "/mis-tickets",
  verificarToken,
  obtenerMisTickets
);

router.get(
  "/admin",

  verificarToken,

  verificarRol("admin"),

  (req, res) => {

    res.json({
      mensaje: "Panel admin"
    });
  }
);



export default router;