import { TaskModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }
  
    const { user, task } = req.body;
  
    if (!user?.username || !task?.name) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  
    try {
      const newTask = await TaskModel.createTask(user.username, task);
      return res.status(200).json({newTask});
    } catch (error) {
      console.error("Error en addTask:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }