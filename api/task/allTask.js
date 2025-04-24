import { UserModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
      }
    const { body } = req;
    try {

        const { user } = body;
        const { username } = user;
        const tasks = await UserModel.getAllTasks(username);
        const tasksCompleted = await UserModel.getAllTasksCompleted(username);

        if (!tasks || !tasksCompleted) {
            return res.status(404).json({ message: "No se encontraron tareas" });
        }
        res.status(200).json({ tasks, tasksCompleted });
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener las tareas" , error});
    }
}