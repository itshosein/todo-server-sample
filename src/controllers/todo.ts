import { Request, Response } from "express";
import Todo from "../models/todo";

const getTodos = (req: Request, res: Response) => {
  // res.sendFile(path.join("views", "index.html"), { root: "./src" });
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  Todo.getAllTodos((todos: Todo[]) => {
    res.render("index", {
      pageTitle: "Todo App",
      path: "/",
      todos: todos,
    });
  });
  
};

const getAddTodoPage = (req: Request, res: Response) => {
  // res.sendFile(path.join("views", "add-todo.html"), { root: "./src" });
  res.render("add-todo", {
    pageTitle: "add todos",
    path: "/admin/add-todo",
    submitError: req.query.submitError,
  });
};

const saveTodo = (req: Request, res: Response) => {
  if (!req.body.todoTitle) {
    res.status(404);
    res.redirect("/admin/add-todo?submitError=Todo Title not found!");
    return;
  }
  const todo = new Todo(req.body.todoTitle, req.body.todoDescription);

  todo.save((err: Error | null) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
  });
};

const deleteTodo = (req: Request, res: Response) => {
  console.log(req.params);
  if (req.params.id) {
    Todo.deleteTodo(req.params.id,(isDone) =>{
      if (isDone) {
        res.redirect("/");
      }
    });
  }
}

export default {
  getTodos,
  getAddTodoPage,
  saveTodo,
  deleteTodo
};
