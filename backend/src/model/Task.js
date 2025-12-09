import mongoose from "mongoose";

const taskScheme = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false,
            trim: true,

        },
        status: {
            type: String,
            enum: ["active", "complete"],
            default: "active"
        },
        completedAt: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true, //auto them createdAt & updatedAt
    }
);

const Task = mongoose.model("Task", taskScheme);

export default Task