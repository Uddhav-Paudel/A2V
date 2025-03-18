import request from 'supertest';
import express from 'express';
import aiRoutes from '../routes/ai.js';

const app = express();
app.use(express.json());
app.use('/ai', aiRoutes);

describe('/ai/process', () => {
    it('should return 400 if content is not provided', async () => {
        const response = await request(app).post('/ai/process').send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Content is required.');
    });

    it('should process content and return a video', async () => {
        const mockContent = 'This is a test content.';
        const response = await request(app).post('/ai/process').send({ content: mockContent });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('video');
        expect(response.body.video).toMatch(/^data:video\/mp4;base64,/);
    });
});
