import { UserModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const { body } = req;
    try {
        
        const { user, task } = body;
        const {username} = user
        const newTask = await UserModel.createTask(username,task);
        const tasks = await UserModel.getAllTasks(username);
        
       res.status(200).json(newTask,tasks);
    } catch (error) {
        return res.status(400).json({ message: "Error al crear una nueva tarea" , error});
    }
}