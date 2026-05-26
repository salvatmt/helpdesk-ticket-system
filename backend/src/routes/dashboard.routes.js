import { Router } from "express";

import {
  obtenerEstadisticas
} from "../controllers/dashboard.controller.js";

import {
  verificarToken
} from "../middleware/auth.middleware.js";

import {
  verificarRol
} from "../middleware/role.middleware.js";

const router = Router();


// Dashboard
router.get(
  "/",

  verificarToken,

  verificarRol("admin", "tecnico"),

  obtenerEstadisticas
);

export default router;