import fetchMock from "jest-fetch-mock";
import request from "supertest";
import app from "../app";
import { initializeMockClients } from './mocks/azureMocks.js';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

describe("AI Routes", () => {
    test("POST /content-safety - should analyze content safety", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ result: "safe" }));

        const response = await request(app)
            .post("/content-safety")
            .send({ content: "Test content" });

        expect(response.status).toBe(200);
        expect(response.body.safetyResult).toEqual({ result: "safe" });
    });

    test("POST /summarize - should summarize content", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ summary: "This is a summary." }));

        const response = await request(app)
            .post("/summarize")
            .send({ content: "Test content to summarize" });

        expect(response.status).toBe(200);
        expect(response.body.summary).toBe("This is a summary.");
    });

    test("POST /text-to-image - should generate an image", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ image: "image-data" }));

        const response = await request(app)
            .post("/text-to-image")
            .send({ description: "Generate an image" });

        expect(response.status).toBe(200);
        expect(response.body.image).toBe("image-data");
    });

    test("POST /text-to-speech - should generate audio", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ audio: "audio-data" }));

        const response = await request(app)
            .post("/text-to-speech")
            .send({ text: "Generate audio" });

        expect(response.status).toBe(200);
        expect(response.body.audio).toBe("audio-data");
    });
});

describe('Azure AI Tests', () => {
    let contentSafetyClient, openAiClient;

    beforeAll(() => {
        const clients = initializeMockClients();
        contentSafetyClient = clients.contentSafetyClient;
        openAiClient = clients.openAiClient;
    });

    test('Content Safety Client analyzes text', async () => {
        const result = await contentSafetyClient.analyzeText({ text: 'Test text' });
        expect(result).toEqual({ result: 'safe', text: 'Test text' });
    });

    test('OpenAI Client generates completions', async () => {
        const result = await openAiClient.getCompletions({ prompt: 'Summarize this' });
        expect(result.choices[0].text).toBe('This is a mocked summary.');
    });
});
