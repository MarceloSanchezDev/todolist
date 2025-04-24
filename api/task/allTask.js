import { UserModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    const { body } = req;
    try {
        /*
        const { user } = body;
        const { username } = user;
        const tasks = await UserModel.getAllTasks(username);
        const tasksCompleted = await UserModel.getAllTasksCompleted(username);
        */
        res.status(200).json({ body});
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener las tareas" , error});
    }
}