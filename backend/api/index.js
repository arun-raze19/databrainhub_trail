import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure middleware
app.use(cors({
  credentials: true,
  origin: ['https://databrainhub-trail-ojq7.vercel.app', 'http://localhost:3000', 'http://localhost:5173']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection (only connect when handling a request)
const connectToMongoDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    const mongoUrl = process.env.MONGO_URL || "mongodb+srv://noorani232004:5vj0vCSBiVhqgPyF@cluster.2btnttn.mongodb.net/";
    try {
      await mongoose.connect(mongoUrl);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
  return mongoose.connection;
};

// Define MongoDB schemas
const messageSchema = new mongoose.Schema({
  message: String,
  user: String,
  time: String
});

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({ message: "DataBrainHub API is working" });
});

// User authentication routes
app.post('/login', async (req, res) => {
  try {
    await connectToMongoDB();

    // Your login logic here
    const { email, password } = req.body;

    // This is a placeholder - replace with your actual login logic
    res.json({
      name: email.split('@')[0],
      email: email,
      role: "user"
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get('/me', async (req, res) => {
  try {
    // Simplified user info endpoint
    res.json({
      name: "demo_user",
      email: "demo@example.com",
      role: "user"
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

app.delete('/logout', (req, res) => {
  res.json({ msg: "Logged out successfully" });
});

// Message routes
app.get('/get-messages', async (req, res) => {
  try {
    await connectToMongoDB();
    const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
    const messages = await Message.find({});
    res.json({ status: "ok", data: messages });
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.post('/send-message', async (req, res) => {
  try {
    await connectToMongoDB();
    const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
    const { message, user, time } = req.body;
    const newMessage = new Message({ message, user, time });
    await newMessage.save();
    res.json({ status: "ok", data: newMessage });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.delete('/delete-message/:id', async (req, res) => {
  try {
    await connectToMongoDB();
    const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
    const messageId = req.params.id;
    await Message.findByIdAndDelete(messageId);
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Handle all other routes
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Export the Express app
export default app;
