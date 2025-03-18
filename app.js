import express from 'express';
import aiRoutes from './routes/ai.js';
import { generateVideo } from './routes/video.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/ai', aiRoutes);
app.use('/video', generateVideo);

// Centralized Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
