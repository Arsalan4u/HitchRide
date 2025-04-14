const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}));

// Configure Socket.IO with CORS
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true,
    pingTimeout: 60000,
    pingInterval: 25000,
    connectTimeout: 20000,
    maxHttpBufferSize: 1e8
});

const port = 3001;

app.set("view engine", "ejs");
app.use(express.static("public")); // Serves public files (like script.js)

app.get("/", (req, res) => {
    const pickup = req.query.pickup;
    const dropoff = req.query.dropoff;
    res.render("index", { pickup, dropoff }); // Pass parameters to the view
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // Send initial connection confirmation
    socket.emit("connection-confirmed", { id: socket.id });

    socket.on("send-location", (msg) => {
        console.log("Received location from:", socket.id, msg);
        io.emit("receive-location", { id: socket.id, ...msg });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        io.emit("user-disconnected", socket.id);
    });

    // Handle errors
    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
