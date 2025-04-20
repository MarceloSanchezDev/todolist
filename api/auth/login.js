import { validUser } from "../schema/userSchema";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
        const {body} = req;
        const userValid = validUser(body)
    return res.status(200).json({ message: "Hola desde la API" , userValid});
}