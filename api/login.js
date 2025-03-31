import dbConnect from "../utils/dbConnect.js";
import User from "../models/User.js";
import { generateToken } from "../utils/jwtUtils.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    await dbConnect();

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Credenciales incorrectas." });
        }

        const token = generateToken(user);

        return res.status(200).json({ message: "Inicio de sesión exitoso.", token });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor: " + error });
    }
}
