
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import userVerificationRoutes from "./routes/userVerification.js";
// import vehicleRoutes from "./routes/vehicleRoutes.js";
// import clerkRoutes from './routes/clerk.routes.js';

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());

// app.use("/api/clerk/webhook", express.json());

// // 👇 Then use json for rest
// app.use(express.json());

// app.use("/api/verification", userVerificationRoutes);
// app.use("/api/vehicle", vehicleRoutes);
// app.use("/api/clerk", clerkRoutes);

// app.get("/", (req, res) => {
//   res.send("Carpool Backend is Live!");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userVerificationRoutes from "./routes/userVerification.js";
import verificationRoutes from "./routes/Verification.routes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import clerkRoutes from './routes/clerk.routes.js';
import mapRoutes from './routes/mapRoutes.js';
import { io } from './controllers/mapController.js';
import emergencyRoutes from './routes/emergencyRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use("/api/clerk/webhook", express.json());

// 👇 Then use json for rest
app.use(express.json());

app.use("/api/verification", userVerificationRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/clerk", clerkRoutes);
app.use("/api/map", mapRoutes);
app.use('/api/emergency', emergencyRoutes);


app.get("/", (req, res) => {
  res.send("Carpool Backend is Live!");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Attach socket.io to the server
io.attach(server);