import express from 'express';
import { initializeMockClients } from '../tests/mocks/azureMocks.js';

const router = express.Router();
const { contentSafetyClient, openAiClient } = initializeMockClients();

router.post('/content-safety', async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: 'Content is required.' });

        const safetyResult = await contentSafetyClient.analyzeText({ text: content });
        res.status(200).json({ safetyResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/summarize', async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ error: 'Content is required.' });

        const result = await openAiClient.getCompletions({ prompt: content });
        res.status(200).json({ summary: result.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Text-to-Image API
router.post("/text-to-image", async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: "Description is required." });
    }

    try {
        const response = await fetch(`${process.env.AZURE_TEXT_TO_IMAGE_ENDPOINT}/generate`, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": process.env.AZURE_TEXT_TO_IMAGE_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: description }),
        });

        if (!response.ok) {
            throw new Error(`Text-to-Image API error: ${response.statusText}`);
        }

        const result = await response.json();
        res.status(200).json({ image: result });
    } catch (error) {
        res.status(500).json({ error: `Error generating image: ${error.message}` });
    }
});

// Text-to-Speech API
router.post("/text-to-speech", async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required." });
    }

    try {
        const response = await fetch(`${process.env.AZURE_TEXT_TO_SPEECH_ENDPOINT}/synthesize`, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": process.env.AZURE_TEXT_TO_SPEECH_API_KEY,
                "Content-Type": "application/ssml+xml",
            },
            body: `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
                      <voice name="en-US-JennyNeural">${text}</voice>
                   </speak>`,
        });

        if (!response.ok) {
            throw new Error(`Text-to-Speech API error: ${response.statusText}`);
        }

        const audioBuffer = await response.buffer();
        const audioBase64 = audioBuffer.toString("base64");
        res.status(200).json({ audio: `data:audio/wav;base64,${audioBase64}` });
    } catch (error) {
        res.status(500).json({ error: `Error generating audio: ${error.message}` });
    }
});

export default router;
