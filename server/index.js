
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userVerificationRoutes from "./routes/userVerification.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import clerkRoutes from './routes/clerk.routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use("/api/clerk/webhook", express.json());

// 👇 Then use json for rest
app.use(express.json());

app.use("/api/verification", userVerificationRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/clerk", clerkRoutes);

app.get("/", (req, res) => {
  res.send("Carpool Backend is Live!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


