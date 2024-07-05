import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.mjs";
import veterinarioRoutes from "./routes/veterinarioRoutes.mjs";
import pacienteRoutes from "./routes/pacienteRoutes.mjs";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

//Permitir conexion del frontend. Soluciona error de CORS policy. Instalar npm i cors
const allowDomains = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowDomains.indexOf(origin) !== -1) {
      //El origen está permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};
app.use(cors(corsOptions));

//Archivos de rutas. Carpeta Routes
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("servidor funcionando en el puerto 4000");
});
