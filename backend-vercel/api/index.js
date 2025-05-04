import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import AWS from 'aws-sdk';

dotenv.config();

// Initialize express
const app = express();

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY || "AKIAVDLC3ZUR4S3GCTXA",
  secretAccessKey: process.env.AWS_SECRET_KEY || "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",
  region: process.env.AWS_REGION || "ap-south-1"
});

// Configure database connections
const mongoUrl = process.env.MONGO_URL || "mongodb+srv://noorani232004:5vj0vCSBiVhqgPyF@cluster.2btnttn.mongodb.net/";

// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Configure MySQL connection
const db = new Sequelize(
  process.env.DB_NAME || 'bsi9av994zvumhyngzth',
  process.env.DB_USER || 'umlxas4rhxrkqqu5',
  process.env.DB_PASSWORD || 'Fwknrgb8U0AHS8kdP0o0',
  {
    host: process.env.DB_HOST || "bsi9av994zvumhyngzth-mysql.services.clever-cloud.com",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

// Middleware
app.use(cors({
  credentials: true,
  origin: ['https://databrainhub-trail-ojq7.vercel.app', 'http://localhost:3000', 'http://localhost:5173']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define MongoDB schemas
const messageSchema = new mongoose.Schema({
  message: String,
  user: String,
  time: String
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: "DataBrainHub API is working" });
});

// User authentication routes
app.post('/login', async (req, res) => {
  try {
    // Simplified login for demonstration
    const { email, password } = req.body;
    
    // In a real app, you would verify credentials against your database
    // This is just a placeholder
    if (email && password) {
      res.json({ 
        name: email.split('@')[0],
        email: email,
        role: "user"
      });
    } else {
      res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

app.get('/me', async (req, res) => {
  // Simplified user info endpoint
  // In a real app, you would verify session/token
  res.json({ 
    name: "demo_user",
    email: "demo@example.com",
    role: "user"
  });
});

app.delete('/logout', (req, res) => {
  res.json({ msg: "Logged out successfully" });
});

// Message routes
app.get('/get-messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json({ status: "ok", data: messages });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.post('/send-message', async (req, res) => {
  try {
    const { message, user, time } = req.body;
    const newMessage = new Message({ message, user, time });
    await newMessage.save();
    res.json({ status: "ok", data: newMessage });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.delete('/delete-message/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    await Message.findByIdAndDelete(messageId);
    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Export for serverless use
export default app;
