import { UserModel } from '../models/turso/userTask.js';
import {validRegisterUser} from '../schema/userSchema.js'

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const {body} = req;
    try {
        const userValid = validRegisterUser(body)
        if (!userValid) {
            throw new Error("Invalid data")
        }
        const userRegister = await UserModel.registerUser(userValid.data)
        if (userRegister.length === 0) {
            throw new Error("Error al registrar el usuario")
        }
        res.status(200).json({ message: "Usuario registrado correctamente", userRegister });
    } catch (error) {
        return res.status(400).json({ message: "Datos inválidos" , error:error.message});
    }
    

}