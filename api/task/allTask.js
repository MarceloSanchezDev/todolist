import { TaskModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
      }
    const { body } = req;
    try {
      
      const { user } = body;
      const { username } = user;
      const tasks = await TaskModel.getAllTasks(username);
      const tasksCompleted = await TaskModel.getAllTasksCompleted(username);
  
      res.status(200).json({ tasks, tasksCompleted });
    } catch (error) {
        console.error("Error en allTask:", error);
        res.status(500).json({ error: "Error interno del servidor" });      
    }

   
}