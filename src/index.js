import express from 'express';
import http from 'http';
import { Server as WebSocketServer } from 'socket.io';
import path from 'path';
import dotenv from 'dotenv';

import app from './app';
import sockets from './sockets';
import { connectDB } from './db';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes'; 
import { protect } from './middlewares/authMiddleware';

dotenv.config();

connectDB();

const server = http.createServer(app);
const io = new WebSocketServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

sockets(io);

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api', notesRoutes); 

app.get('/api/protected', protect, (req, res) => {
    res.send('This is a protected route');
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
