**Node.js** API Project. It integrates with Azure AI services to provide features like content safety analysis, text summarization, text-to-image generation, text-to-speech synthesis, and video generation.

## Features

- **Content Safety API**: Analyze text for safety using Azure Content Safety.
- **Text Summarization**: Summarize text using Azure OpenAI.
- **Text-to-Image API**: Generate images from text descriptions.
- **Text-to-Speech API**: Convert text to speech audio.
- **Video Generation**: Create videos by combining images and audio.

## Prerequisites

- Node.js (v16 or higher)
- Azure Cognitive Services API keys and endpoints for:
  - Content Safety
  - OpenAI
  - Text-to-Image
  - Text-to-Speech

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd A2VNode
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Rename `.env.example` to `.env`.
   - Update the placeholders in `.env` with your Azure API keys and endpoints.

   Example `.env` file:
   ```properties
   AZURE_CONTENT_SAFETY_ENDPOINT=https://<your-content-safety-endpoint>.cognitiveservices.azure.com
   AZURE_CONTENT_SAFETY_API_KEY=<your-content-safety-api-key>

   AZURE_OPENAI_ENDPOINT=https://<your-openai-endpoint>.openai.azure.com
   AZURE_OPENAI_API_KEY=<your-openai-api-key>

   AZURE_TEXT_TO_IMAGE_ENDPOINT=https://<your-text-to-image-endpoint>.cognitiveservices.azure.com
   AZURE_TEXT_TO_IMAGE_API_KEY=<your-text-to-image-api-key>

   AZURE_TEXT_TO_SPEECH_ENDPOINT=https://<your-text-to-speech-endpoint>.cognitiveservices.azure.com
   AZURE_TEXT_TO_SPEECH_API_KEY=<your-text-to-speech-api-key>

   PORT=3000
   ```

4. Run the server:
   ```bash
   npm start
   ```

## API Endpoints

### Content Safety
- **POST** `/ai/content-safety`
  - **Body**: `{ "content": "text to analyze" }`
  - **Response**: Safety analysis result.

### Text Summarization
- **POST** `/ai/summarize`
  - **Body**: `{ "content": "text to summarize" }`
  - **Response**: Summarized text.

### Text-to-Image
- **POST** `/ai/text-to-image`
  - **Body**: `{ "description": "image description" }`
  - **Response**: Generated image.

### Text-to-Speech
- **POST** `/ai/text-to-speech`
  - **Body**: `{ "text": "text to convert to speech" }`
  - **Response**: Audio file in Base64 format.

### Video Generation
- **POST** `/video/generate`
  - **Body**: `[ { "image": "base64-image", "audio": "base64-audio" }, ... ]`
  - **Response**: Generated video in Base64 format.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
