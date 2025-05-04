// Minimal API that should work on Vercel
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

  // Return a simple response
  res.status(200).json({
    message: 'Minimal API is working!',
    timestamp: new Date().toISOString(),
    endpoints: {
      '/': 'This endpoint',
      '/api/login': 'Login endpoint (POST)',
      '/api/me': 'Get current user (GET)',
      '/api/logout': 'Logout endpoint (DELETE)'
    }
  });
}
