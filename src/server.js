import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.error("Error de conexión:", err));

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', UserSchema);

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

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
        
        res.status(201).json({ message: "Usuario registrado con éxito." });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor." + error });
    }
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
