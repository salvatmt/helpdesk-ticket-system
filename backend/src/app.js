import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import { verificarToken } from "./middleware/auth.middleware.js";
import ticketRoutes from "./routes/ticket.routes.js";
import comentarioRoutes from "./routes/comentario.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Help Desk funcionando"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/comentarios", comentarioRoutes);

app.get(
  "/api/perfil",
  verificarToken,
  (req, res) => {

    res.json({
      mensaje: "Ruta protegida",
      usuario: req.usuario
    });
  }
);

app.use("/api/tickets", ticketRoutes);

export default app;