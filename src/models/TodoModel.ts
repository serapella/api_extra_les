import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    title: {
type: String,
required: true,
trim: true,
    },
completed: {
type: Boolean,
required: true, 
default: false,
},
},
{
timestamps: true,
})

export const Todo = mongoose.model("Todo", todoSchema);