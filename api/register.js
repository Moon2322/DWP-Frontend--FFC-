import dbConnect from "../utils/dbConnect.js"; 
import User from "../models/User.js"; 

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    await dbConnect();

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        return res.status(201).json({ message: "Usuario registrado con éxito." });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor: " + error });
    }
}
