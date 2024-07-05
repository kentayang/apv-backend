import Paciente from "../models/Paciente.mjs";

const nuevoPaciente = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    const pacienteGuardado = await paciente.save();
    res.json(pacienteGuardado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);
  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  if (id.toString().length !== 24) {
    return res.status(300).json({ msg: "Id no válido" });
  }
  const paciente = await Paciente.findById(id);
  //Validamos que el paciente exista
  if (!paciente) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }
  //Validamos que el paciente pertenezca al veterinario
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    const error = new Error("Accion no válida");
    return res.json({ msg: error.message });
  }
  //Mostramos Paciente
  return res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  if (id.toString().length !== 24) {
    return res.status(300).json({ msg: "Id no válido" });
  }
  const paciente = await Paciente.findById(id);
  //Validamos que el paciente exista
  if (!paciente) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }
  //Validamos que el paciente pertenezca al veterinario
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    const error = new Error("Accion no válida");
    return res.json({ msg: error.message });
  }
  //Actualizamos Paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha_alta = req.body.fecha_alta || paciente.fecha_alta;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();
    return res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  if (id.toString().length !== 24) {
    return res.status(300).json({ msg: "Id no válido" });
  }
  const paciente = await Paciente.findById(id);
  console.log(paciente);
  //Validamos que el paciente exista
  if (!paciente) {
    return res.status(404).json({ msg: "Paciente no encontrado" });
  }
  //Validamos que el paciente pertenezca al veterinario
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }
  //Eliminamos Paciente
  try {
    await paciente.deleteOne();
    return res.json({ msg: "Paciente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  nuevoPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
