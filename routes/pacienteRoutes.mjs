import express from "express";
import {
  nuevoPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacienteController.mjs";
import checkAuth from "../middleware/authMiddleware.mjs";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, nuevoPaciente)
  .get(checkAuth, obtenerPacientes);

router
  .route("/:id")
  .get(checkAuth, obtenerPaciente)
  .put(checkAuth, actualizarPaciente)
  .delete(checkAuth, eliminarPaciente);

export default router;
