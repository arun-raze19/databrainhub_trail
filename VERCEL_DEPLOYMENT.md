# Vercel Deployment Guide for DataBrainHub

This guide provides step-by-step instructions for deploying the DataBrainHub frontend to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)
- Your DataBrainHub code pushed to a GitHub repository

## Deployment Steps

### 1. Prepare Your Repository

Make sure your repository includes:
- The updated `vercel.json` file
- The static fallback HTML files
- The updated `vite.config.js`
- The updated `package.json`

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project settings:

### 3. Configure Build Settings

Use these settings for your Vercel project:

- **Framework Preset**: Vite
- **Build Command**: `npm run build:vercel`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 4. Environment Variables

Add these environment variables in the Vercel dashboard:

```
VITE_API_URL=https://mock-api.example.com
VITE_SOCKET_URL=https://mock-api.example.com
```

### 5. Deploy

Click "Deploy" and wait for the build to complete.

## Troubleshooting

If you encounter a blank page after deployment:

1. **Check the Vercel Build Logs**:
   - Go to your project in the Vercel dashboard
   - Click on the latest deployment
   - Check the build logs for any errors

2. **Check the Browser Console**:
   - Open your deployed site
   - Open the browser developer tools (F12)
   - Check the console for any errors

3. **Try the Fallback Page**:
   - Navigate to `https://your-vercel-domain.vercel.app/static-fallback.html`
   - If this page loads but the main page doesn't, there's an issue with your React application

4. **Verify Your vercel.json**:
   - Make sure your `vercel.json` file is properly formatted
   - Check that it doesn't contain any conflicting settings

5. **Check Your Environment Variables**:
   - Verify that your environment variables are correctly set in the Vercel dashboard

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/en/main)

## Support

If you continue to experience issues, please:

1. Create a new issue in the GitHub repository
2. Provide detailed information about the problem
3. Include screenshots of any error messages
4. Share the URL of your Vercel deployment
