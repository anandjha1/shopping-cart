import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/products", productRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at port ${PORT}`);
});