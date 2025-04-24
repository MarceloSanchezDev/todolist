import { TaskModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const { body } = req;
    try {
        const { username, task } = body;
        const newTaskCompleted = await TaskModel.completeTask(task.id);
        if(!newTaskCompleted) {
            throw new Error("Error al crear la tarea")
        }
        const tasks = await TaskModel.getAllTasksCompleted(username);
        res.status(200).json({ tasks });
    } catch (error) {
        return res.status(400).json({ message: "Error al completar una nueva tarea" , error});
    }
}