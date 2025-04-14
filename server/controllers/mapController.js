import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('send-location', (msg) => {
        io.emit('receive-location', { id: socket.id, ...msg });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        io.emit('user-disconnected', socket.id);
    });
});

// Get map data
export const getMapData = async (req, res) => {
    try {
        const { pickup, dropoff } = req.body;
        
        // Here you can add any map-related logic
        // For now, we'll just return the locations
        res.json({
            success: true,
            data: {
                pickup,
                dropoff,
                socketUrl: process.env.SOCKET_URL || 'http://localhost:3000'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export { io }; 