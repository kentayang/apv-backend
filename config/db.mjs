import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connexion = await mongoose.connect(process.env.MONGO_URI)

        const url = `${connexion.connection.host}:${connexion.connection.port}`
        console.log(`MongoDB conectado en: ${url}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB