// Serverless handler for Vercel
import app from './index.js';

// This is the serverless function handler
export default async function handler(req, res) {
  // Forward the request to the Express app
  return app(req, res);
}
