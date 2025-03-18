# Text-to-Video Tool

A Node.js library to convert text into video using Azure AI services.

## Features
- Content safety analysis
- Text summarization
- Text-to-image generation
- Text-to-speech synthesis
- Video generation from text

## Installation

```bash
npm install text-to-video-tool
```

## Usage

1. Set the required environment variables:
   ```bash
   export AZURE_CONTENT_SAFETY_ENDPOINT=<your_content_safety_endpoint>
   export AZURE_CONTENT_SAFETY_API_KEY=<your_content_safety_api_key>
   export AZURE_OPENAI_ENDPOINT=<your_openai_endpoint>
   export AZURE_OPENAI_API_KEY=<your_openai_api_key>
   ```

2. Use the library in your project:
   ```javascript
   const { initializeClients, analyzeContentSafety, summarizeContent } = require('text-to-video-tool');

   const config = {
       contentSafetyEndpoint: process.env.AZURE_CONTENT_SAFETY_ENDPOINT,
       contentSafetyApiKey: process.env.AZURE_CONTENT_SAFETY_API_KEY,
       openAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
       openAiApiKey: process.env.AZURE_OPENAI_API_KEY,
   };

   const { contentSafetyClient, openAiClient } = initializeClients(config);

   async function main() {
       const content = "Your text here";
       const safetyResult = await analyzeContentSafety(content, contentSafetyClient);
       const summary = await summarizeContent(content, openAiClient);
       console.log({ safetyResult, summary });
   }

   main();
   ```

## License
MIT
