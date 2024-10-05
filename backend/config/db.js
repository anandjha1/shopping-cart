import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected Successfully.. :" + conn.connection.host);

    } catch (err) {
        console.error("DB Connection error :", err);
        process.exit(1);
    }

}