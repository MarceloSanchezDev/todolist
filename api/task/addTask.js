import { UserModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const { body } = req;
    
        
        const { user, task } = body;
        const {username} = user
        const newTask = await UserModel.createTask(username,task);
       res.status(200).json(newTask);
     
}