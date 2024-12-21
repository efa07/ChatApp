import express from "express"
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from "./lib/db.js";

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})