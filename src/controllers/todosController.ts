import { Request, Response } from "express";
import { Todo } from "../models/TodoModel";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};


export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const oldtodo = await Todo.findByIdAndUpdate(id);
    
    if (!oldtodo) {
      res.status(404).json({ message: `Todo with id ${id} not found` });
      return;
    }

    const todo = await Todo.findByIdAndUpdate(
      id, { completed: !oldtodo.completed }, 
      { new: true });

    res.status(200).json(oldtodo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      res.status(404).json({ message: `Todo with id ${id} not found` });
      return;
    }

    res.status(200).json({ message: `Todo with id ${id} deleted` });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
