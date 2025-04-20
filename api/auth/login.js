export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const {username, password} = req.body;
    return res.status(200).json({ message: "Hola desde la API" , username, password});
}