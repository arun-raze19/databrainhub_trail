# DataBrainHub

## Deployment Guide (Frontend Only)

This guide explains how to deploy the DataBrainHub frontend without requiring a backend. The application has been modified to use mock data instead of making real API calls, making it easy to deploy to platforms like Vercel.

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Production Deployment

1. Make sure the mock data flag is enabled:
   - In `src/services/mockDataService.js`, ensure `useMockData` is set to `true`

2. Build the project:
   ```
   npm run build
   ```

3. Deploy to Vercel:
   - Connect your GitHub repository to Vercel
   - Configure the build settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Deploy

### How It Works

The application has been modified to work without a backend by:

1. **Mock Data Service**: A service that provides mock data instead of making API calls
2. **Conditional API Calls**: All API calls are wrapped in conditions that check whether to use mock data
3. **Fallback Content**: A fallback component is shown if the API is not available
4. **Socket.io Simulation**: Socket.io functionality is simulated using custom events

### Features Available in Frontend-Only Mode

- User authentication (simulated)
- ClassBridge chat (with mock messages)
- Resource browsing
- All UI components and navigation

### Customizing Mock Data

You can customize the mock data by editing the `src/services/mockDataService.js` file:

- `mockUser`: The user data returned by authentication
- `mockMessages`: The messages shown in ClassBridge
- Other mock functions for different API endpoints

### Switching Back to Real API

If you want to use a real backend API:

1. Set `useMockData` to `false` in `src/services/mockDataService.js`
2. Update the `.env.production` file with your backend URLs:
   ```
   VITE_API_URL=https://your-backend-api-url.com
   VITE_SOCKET_URL=https://your-backend-api-url.com
   ```
3. Rebuild and redeploy

## Troubleshooting

If you encounter issues:

1. **Blank Page**: Check browser console for errors
2. **Missing Features**: Ensure all components are properly importing the mock data service
3. **Styling Issues**: Make sure all CSS files are properly imported
4. **Build Errors**: Check the build logs in Vercel for any compilation errors
