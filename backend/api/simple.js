// A super simple API endpoint that should work on Vercel no matter what
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Return a simple response with useful information
  res.status(200).json({
    message: 'Simple API is working!',
    timestamp: new Date().toISOString(),
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      body: req.body
    },
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      vercel: process.env.VERCEL || false,
      vercelEnv: process.env.VERCEL_ENV || 'development'
    }
  });
}
