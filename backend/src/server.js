import express from "express";
import taskRoute from "./route/taskRoute.js";
import cors from 'cors'
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors())
app.use(express.json());
app.use("/tasks", taskRoute);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});

