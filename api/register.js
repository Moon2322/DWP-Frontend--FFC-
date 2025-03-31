import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import sendVerificationEmail from '../utils/sendEmail.js';

dotenv.config();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }
    
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        // eslint-disable-next-line no-undef
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const newUser = new User({ firstName, lastName, email, password: hashedPassword, verificationToken, isVerified: false });
        await newUser.save();
        
        // 🚀 Enviar respuesta inmediatamente sin esperar el correo
        res.status(201).json({ message: 'Usuario registrado con éxito. Verifica tu correo electrónico.' });

        // 📨 Enviar el correo en segundo plano sin bloquear la API
        sendVerificationEmail(email, verificationToken)
            .catch(err => console.error("Error enviando correo:", err));

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}
