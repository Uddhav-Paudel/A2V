// Mock Azure Content Safety Client
class MockContentSafetyClient {
    async analyzeText({ text }) {
        if (!text) throw new Error('Text is required.');
        return { result: 'safe', text };
    }
}

// Mock Azure OpenAI Client
class MockOpenAIClient {
    async getCompletions({ prompt }) {
        if (!prompt) throw new Error('Prompt is required.');
        return {
            choices: [{ text: 'This is a mocked summary.' }],
        };
    }
}

// Mock Initialization
function initializeMockClients() {
    const contentSafetyClient = new MockContentSafetyClient();
    const openAiClient = new MockOpenAIClient();
    return { contentSafetyClient, openAiClient };
}

export {
    MockContentSafetyClient,
    MockOpenAIClient,
    initializeMockClients,
};
