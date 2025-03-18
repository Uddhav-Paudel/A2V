import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

// Example: Health Check for External API
async function performHealthCheck() {
    try {
        const response = await fetch(process.env.AZURE_CONTENT_SAFETY_ENDPOINT);
        if (!response.ok) throw new Error('Azure Content Safety API is unreachable');
        console.log('Health check passed');
    } catch (err) {
        console.error('Health check failed:', err.message);
        process.exit(1); // Exit if the health check fails
    }
}

// Perform health check and start the server
//performHealthCheck().then(() => {
    import('./bin/www').then(module => {
        // Server started after health check passes
    });
//});
