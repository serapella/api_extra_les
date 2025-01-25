import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose"; 
import { notFound } from "./controllers/notFoundController";
import { specs } from "./swagger";
import swaggerUi from "swagger-ui-express";
import todoRoutes from "./routes/todoRoutes";
import { exit } from "process";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.all("*", notFound);

// Connect to MongoDB and start the server
(async () => {
  try {
    if (!process.env.MONGO_URI_LIVE) {
      throw new Error("MONGO_URI environment variable is not set");
    }
    await mongoose.connect(process.env.MONGO_URI_LIVE);
    console.log(`Connected to MongoDB`);
status exit 0
    // Start the server after a successful connection to MongoDB
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
