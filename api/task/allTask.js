import { UserModel } from "../models/turso/userTask.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
      }
    const { body } = req;
    

        const { user } = body;
        const { username } = user;
        const tasks = await UserModel.getAllTasks(username);
        const tasksCompleted = await UserModel.getAllTasksCompleted(username);

        res.status(200).json({ tasks, tasksCompleted });
   
}