# DataBrainHub

## Deployment Guide

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_SOCKET_URL=http://localhost:5000
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Production Deployment

1. Create a `.env.production` file with your production API URLs:
   ```
   VITE_API_URL=https://your-backend-api-url.com
   VITE_SOCKET_URL=https://your-backend-api-url.com
   ```

2. Build the project:
   ```
   npm run build
   ```

3. Deploy to Vercel:
   ```
   vercel --prod
   ```

### Important Notes

- Make sure your backend API is deployed and accessible from your frontend
- Update the `.env.production` file with the correct backend URL before deploying
- If you're using authentication, ensure CORS is properly configured on your backend

## Troubleshooting

If you encounter a blank page after deployment:

1. Check browser console for errors
2. Verify that your backend API is accessible from the deployed frontend
3. Ensure environment variables are correctly set in Vercel dashboard
4. Check that all API endpoints are using the environment variables and not hardcoded localhost URLs
