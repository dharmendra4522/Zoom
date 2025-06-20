import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

//express server
const app = express();
const server = createServer(app); //http server
const io = connectToSocket(server); //socket.io server

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zoom";

app.set("port", PORT);
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    try {
        const connectionDb = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB Connected: ${connectionDb.connection.host}`);
        
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

start();