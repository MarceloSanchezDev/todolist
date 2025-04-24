import { TaskModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const { body } = req;
    try {
        const { user, task } = body;
        const {username} =  user;
        const newTaskCompleted = await TaskModel.completeTask(task.id_task);
        if(!newTaskCompleted) {
            throw new Error("Error al crear la tarea")
        }
        const tasksCompleted = await TaskModel.getAllTasksCompleted(username);
        const tasks = await TaskModel.getAllTasks(username);
        res.status(200).json({ tasks ,tasksCompleted });
    } catch (error) {
        return res.status(400).json({ message: "Error al completar una nueva tarea" , error});
    }
}