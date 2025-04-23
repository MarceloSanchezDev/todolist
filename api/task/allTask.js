import { UserModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const { body } = req;
    try {
        const { username } = body;
        const tasks = await UserModel.getAllTasks(username);
        const tasksCompleted = await UserModel.getAllTasksCompleted(username);
        res.status(200).json({ tasks, tasksCompleted });
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener las tareas" , error});
    }
}