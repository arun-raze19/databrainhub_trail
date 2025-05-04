# DataBrainHub Backend for Vercel

This is a simplified version of the DataBrainHub backend adapted to run on Vercel's serverless platform.

## Important Notes

1. This is a simplified version of your original backend
2. Socket.io functionality has been removed as it's not compatible with serverless
3. Basic API endpoints have been preserved
4. Database connections are maintained

## Deployment Instructions

1. Push this code to a GitHub repository
2. Connect the repository to Vercel
3. Set up environment variables in the Vercel dashboard
4. Deploy

## Environment Variables

Make sure to set these in your Vercel project settings:

- `MONGO_URL`: Your MongoDB connection string
- `AWS_ACCESS_KEY`: Your AWS access key
- `AWS_SECRET_KEY`: Your AWS secret key
- `AWS_REGION`: Your AWS region
- `S3_BUCKET_NAME`: Your S3 bucket name
- `DB_NAME`: Your MySQL database name
- `DB_USER`: Your MySQL username
- `DB_PASSWORD`: Your MySQL password
- `DB_HOST`: Your MySQL host
- `DB_PORT`: Your MySQL port

## Local Development

```bash
npm install
npm run dev
```
