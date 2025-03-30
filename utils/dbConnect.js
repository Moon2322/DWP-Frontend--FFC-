import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado a MongoDB Atlas");
    } catch (error) {
        console.error("Error de conexión:", error);
        throw new Error("No se pudo conectar a MongoDB");
    }
};

export default dbConnect;
