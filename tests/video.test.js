const { generateVideo } = require('../routes/video');
const fs = require('fs');
const path = require('path');

describe('generateVideo', () => {
    const TEMP_DIR = path.join(require('os').tmpdir(), 'video_tool_temp');

    afterEach(() => {
        if (fs.existsSync(TEMP_DIR)) {
            fs.rmSync(TEMP_DIR, { recursive: true, force: true });
        }
    });

    it('should throw an error if mediaData is not an array', async () => {
        await expect(generateVideo(null)).rejects.toThrow('Media data is required and must be an array.');
    });

    it('should generate a video and return it as a Base64 string', async () => {
        const mediaData = [
            {
                image: `data:image/png;base64,${Buffer.from('fake-image-data').toString('base64')}`,
                audio: `data:audio/wav;base64,${Buffer.from('fake-audio-data').toString('base64')}`,
            },
        ];

        const videoBase64 = await generateVideo(mediaData);
        expect(videoBase64).toMatch(/^data:video\/mp4;base64,/);
    });
});
