import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Temporary directory for storing intermediate files
const TEMP_DIR = path.join(os.tmpdir(), 'video_tool_temp');

// Ensure TEMP_DIR exists
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

async function generateVideo(mediaData) {
    if (!mediaData || !Array.isArray(mediaData) || mediaData.length === 0) {
        throw new Error('Media data is required and must be an array.');
    }

    const imageClips = [];
    try {
        // Step 1: Create image clips with audio
        for (const [index, { image, audio }] of mediaData.entries()) {
            const imagePath = path.join(TEMP_DIR, `image_${index}.png`);
            const audioPath = path.join(TEMP_DIR, `audio_${index}.wav`);
            const outputPath = path.join(TEMP_DIR, `clip_${index}.mp4`);

            // Save image and audio to temporary files
            fs.writeFileSync(imagePath, Buffer.from(image.split(',')[1], 'base64'));
            fs.writeFileSync(audioPath, Buffer.from(audio.split(',')[1], 'base64'));

            // Generate a video clip for the image and audio
            await new Promise((resolve, reject) => {
                ffmpeg()
                    .input(imagePath)
                    .input(audioPath)
                    .outputOptions('-c:v libx264', '-tune stillimage', '-shortest')
                    .output(outputPath)
                    .on('end', () => resolve())
                    .on('error', (err) => reject(err))
                    .run();
            });

            imageClips.push(outputPath);
        }

        // Step 2: Combine all image clips into a single video
        const finalVideoPath = path.join(TEMP_DIR, 'final_video.mp4');
        await new Promise((resolve, reject) => {
            const ffmpegCommand = ffmpeg();

            imageClips.forEach((clip) => ffmpegCommand.input(clip));
            ffmpegCommand
                .outputOptions('-c:v libx264', '-preset veryfast', '-crf 23')
                .mergeToFile(finalVideoPath)
                .on('end', () => resolve())
                .on('error', (err) => reject(err));
        });

        // Step 3: Convert the final video to Base64
        const videoBuffer = fs.readFileSync(finalVideoPath);
        const videoBase64 = videoBuffer.toString('base64');

        // Step 4: Clean up temporary files
        fs.rmSync(TEMP_DIR, { recursive: true, force: true });

        return `data:video/mp4;base64,${videoBase64}`;
    } catch (error) {
        // Clean up temporary files in case of an error
        if (fs.existsSync(TEMP_DIR)) {
            fs.rmSync(TEMP_DIR, { recursive: true, force: true });
        }
        throw new Error(`Error generating video: ${error.message}`);
    }
}

export { generateVideo };
