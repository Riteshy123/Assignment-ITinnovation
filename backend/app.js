import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors module
import dotenv from 'dotenv'; // Import dotenv module
import authRoutes from './routers/authRouter.js';

// Load environment variables from .env file
dotenv.config({ path: ".env" });

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

mongoose.set("strictQuery", true);

// Database connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Add this to avoid deprecation warnings
  family: 4,
  serverSelectionTimeoutMS: 30000, // 30 seconds
})
.then(() => {
  console.log("Connected to MongoDB", process.env.DATABASE_URL);
})
.catch(err => {
  console.error("Error connecting to MongoDB", err);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
