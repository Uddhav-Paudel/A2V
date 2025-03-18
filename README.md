# Text-to-Video Tool

A Node.js library to convert text into engaging videos using Azure AI services. This tool leverages advanced AI capabilities for content safety analysis, text summarization, text-to-image generation, text-to-speech synthesis, and video creation.

## Features
- **Content Safety Analysis**: Ensure the input text adheres to safety standards.
- **Text Summarization**: Generate concise summaries of lengthy text.
- **Text-to-Image Generation**: Create images based on textual descriptions.
- **Text-to-Speech Synthesis**: Convert text into natural-sounding speech.
- **Video Generation**: Combine AI-generated assets into a cohesive video.

## Installation

Install the library using npm:

```bash
npm install text-to-video-tool
```

## Prerequisites

1. **Azure AI Services**: Ensure you have access to Azure Content Safety and Azure OpenAI services.
2. **Environment Variables**: Set the following environment variables:
   ```bash
   export AZURE_CONTENT_SAFETY_ENDPOINT=<your_content_safety_endpoint>
   export AZURE_CONTENT_SAFETY_API_KEY=<your_content_safety_api_key>
   export AZURE_OPENAI_ENDPOINT=<your_openai_endpoint>
   export AZURE_OPENAI_API_KEY=<your_openai_api_key>
   ```

## Usage

Here is an example of how to use the library in your project:

```javascript
const {
    initializeClients,
    analyzeContentSafety,
    summarizeContent,
    generateImageFromText,
    synthesizeSpeech,
    createVideo
} = require('text-to-video-tool');

const config = {
    contentSafetyEndpoint: process.env.AZURE_CONTENT_SAFETY_ENDPOINT,
    contentSafetyApiKey: process.env.AZURE_CONTENT_SAFETY_API_KEY,
    openAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
    openAiApiKey: process.env.AZURE_OPENAI_API_KEY,
};

const { contentSafetyClient, openAiClient } = initializeClients(config);

async function main() {
    const content = "Your text here";

    // Analyze content safety
    const safetyResult = await analyzeContentSafety(content, contentSafetyClient);

    // Summarize content
    const summary = await summarizeContent(content, openAiClient);

    // Generate an image from text
    const image = await generateImageFromText(summary, openAiClient);

    // Synthesize speech from text
    const speech = await synthesizeSpeech(summary, openAiClient);

    // Create a video using the generated assets
    const video = await createVideo({ text: summary, image, speech });

    console.log({ safetyResult, summary, video });
}

main();
```

## API Reference

### `initializeClients(config)`
Initializes and returns Azure AI clients.

- **Parameters**:
  - `config`: Object containing Azure service endpoints and API keys.
- **Returns**: `{ contentSafetyClient, openAiClient }`

### `analyzeContentSafety(content, client)`
Analyzes the safety of the provided content.

- **Parameters**:
  - `content`: The text to analyze.
  - `client`: The Azure Content Safety client.
- **Returns**: Safety analysis result.

### `summarizeContent(content, client)`
Summarizes the provided text.

- **Parameters**:
  - `content`: The text to summarize.
  - `client`: The Azure OpenAI client.
- **Returns**: Summarized text.

### `generateImageFromText(text, client)`
Generates an image based on the provided text.

- **Parameters**:
  - `text`: The text description for the image.
  - `client`: The Azure OpenAI client.
- **Returns**: Image data.

### `synthesizeSpeech(text, client)`
Converts text into speech.

- **Parameters**:
  - `text`: The text to convert to speech.
  - `client`: The Azure OpenAI client.
- **Returns**: Speech audio data.

### `createVideo(assets)`
Creates a video using the provided assets.

- **Parameters**:
  - `assets`: Object containing text, image, and speech data.
- **Returns**: Video file.

## License
MIT
