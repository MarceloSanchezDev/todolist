import { UserModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const { body } = req;
    try {
        const { username, task } = body;
        const newTask = await UserModel.createTask(username,task);
        if(!newTask) {
            throw new Error("Error al crear la tarea")
        }
        const tasks = await UserModel.getAllTasks(username);
        res.status(200).json({ tasks });
    } catch (error) {
        return res.status(400).json({ message: "Error al crear una nueva tarea" , error});
    }
}