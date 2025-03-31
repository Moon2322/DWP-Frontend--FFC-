import connectDB from "../utils/dbConnect";
import User from "../models/User";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    const { email, token } = req.body;

    if (!email || !token) {
        return res.status(400).json({ message: "Faltan datos" });
    }

    try {
        await connectDB();
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (user.token !== token) {
            return res.status(400).json({ message: "Código incorrecto" });
        }

        user.isVerified = true;
        user.token = null;
        await user.save();

        res.status(200).json({ message: "Cuenta verificada correctamente" });
    } catch (error) {
        console.error("Error verificando usuario:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}
