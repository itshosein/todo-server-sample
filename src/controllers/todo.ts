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
  if (req.params.id) {
    Todo.deleteTodo(req.params.id, (isDone) => {
      if (isDone) {
        res.redirect("/");
      }
    });
  }
};

const editTodo = (req: Request, res: Response) => {
  Todo.getAllTodos(todos => {
    let todoEdited = todos.filter(todo => {
      return todo.id === req.body.todoId;
    })[0];
    todoEdited.title = req.body.todoTitle;
    todoEdited.desc = req.body.todoDescription;
    todos = todos.map(todo => {
      if (todo.id === req.body.id) {
        return todoEdited;
      }
      return todo;
    });
    Todo.saveAll(todos,(e) => {
      if (e) {
        console.log(e);
        return;
      }
      res.redirect("/");
    });
  })
};

const getEditTodoPage = (req: Request, res: Response) => {
  if (req.params.id) {
    Todo.getTodoById(req.params.id, (todo) => {
      res.render("add-todo", {
        pageTitle: "add todos",
        path: "/admin/add-todo",
        submitError: req.query.submitError,
        editTodo: todo,
      });
    });
  }
};

export default {
  getTodos,
  getAddTodoPage,
  saveTodo,
  deleteTodo,
  getEditTodoPage,
  editTodo,
};
