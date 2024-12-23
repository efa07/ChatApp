import express from "express"
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from "./lib/db.js";
import messageRoutes from "./routes/message.route.js"

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRoutes)

app.use("/api/msg", messageRoutes)



app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})