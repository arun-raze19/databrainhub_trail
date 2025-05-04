// Simple status endpoint
export default function handler(req, res) {
  res.status(200).json({
    status: 'online',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      root: '/',
      login: '/login',
      me: '/me',
      logout: '/logout',
      getMessages: '/get-messages',
      sendMessage: '/send-message',
      deleteMessage: '/delete-message/:id'
    }
  });
}
