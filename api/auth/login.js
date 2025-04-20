import { UserModel } from "../models/turso/userTask";
import { validUser } from "../schema/userSchema";

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
            const userLogin = await UserModel.login(userValid.data)
            if (userLogin.length === 0) {
                throw new Error("Error al logear el usuario")
            }
            
            res.status(200).json({ message: "Usuario logeado correctamente", userLogin });
        } catch (error) {
            return res.status(400).json({ message: "Datos inválidos" , error:error.message});
        }
}