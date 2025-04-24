import { TaskModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const { body } = req;
    try {
        const { username, task } = body;
        const taskDeleted = await TaskModel.deleteTask(task.id_task);
        if(!taskDeleted) {
            throw new Error("Error al borrar la tarea")
        }
        const tasks = await TaskModel.getAllTasks(username);
        res.status(200).json({ message: "Tarea eliminada correctamente", tasks });
    } catch (error) {
        return res.status(400).json({ message: "Error al eliminar tarea" , error});
    }
}