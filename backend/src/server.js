import express from "express";
import taskRoute from "./route/taskRoute.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use("/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
