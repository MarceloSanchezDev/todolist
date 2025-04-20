import { UserModel } from "../models/turso/userTask.js";
import { validUser } from "../schema/userSchema.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
        const {body} = req;
        try {
            const userValid = validUser(body)
            if (!userValid) {
                throw new Error("Invalid data")
            }
            const user = await UserModel.login(userValid.data)
            if (user.length === 0) {
                throw new Error("Error al logear el usuario")
            }
            const { email, id, username,nombre, apellido} = user;
        const token = jwt.sign({ id, email }, SECRET_KEY, {
            expiresIn: '2 days'
        });
            res.status(200).json({ message: "Usuario logeado correctamente", email, id, username, nombre, apellido ,token });
        } catch (error) {
            return res.status(400).json({ message: "Datos inválidos" , error:error.message});
        }
}