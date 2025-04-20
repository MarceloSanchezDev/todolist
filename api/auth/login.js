export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const { userData } = req.body;
    if (!userData) {
        return res.status(400).json({ error: "Username is required" });
    }
    return res.status(200).json({ message: "Hola desde la API" , userData});
}