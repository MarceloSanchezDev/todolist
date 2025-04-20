export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }
    const {body} = req;
    return res.status(200).json({ message: "Hola desde la API" , body});
}