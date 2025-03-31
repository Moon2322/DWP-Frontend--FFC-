import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sendVerificationEmail from '../utils/sendEmail.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch(err => console.error("❌ Error de conexión:", err));

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // eslint-disable-next-line no-undef
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const newUser = new User({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword, 
            verificationToken, 
            isVerified: false 
        });

        await newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito. Verifica tu correo electrónico." });

        await sendVerificationEmail(email, verificationToken);

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
});

// Puerto para correr localmente
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
