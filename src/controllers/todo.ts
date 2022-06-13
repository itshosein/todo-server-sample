import { Request, Response } from "express";
import Todo from "../models/todo.js";

const getTodos = (req: Request, res: Response) => {
  // console.log("main route handler", __dirname);
  // res.sendFile(path.join("views", "index.html"), { root: "./src" });
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  Todo.fetchAllTodos((todos) => {
    res.render("index", {
      pageTitle: "Todo App",
      path: "/",
      todos: todos,
    });
  });
};

const getAddTodoPage = (req: Request, res: Response) => {
  // res.sendFile(path.join("views", "add-todo.html"), { root: "./src" });
  res.render("add-todo", { pageTitle: "add todos", path: "/admin/add-todo" });
};

const saveTodo = (req: Request, res: Response) => {
  const todo = new Todo(req.body.todoTitle, req.body.todoDescription);

  todo.save((err: Error | null) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!req.body.todoTitle) {
      res.status(404);
    } else {
      res.redirect("/");
    }
  });
};

export default {
  getTodos,
  getAddTodoPage,
  saveTodo,
};