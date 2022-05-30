import express from "express";
import path from "path";
import { __dirname } from "../app.js";

const route = express.Router();

route.get("/add-todo", (req, res) => {
  res.sendFile(path.join("views", "add-todo.html"), { root: "./src" });
});

route.post("/add-todo", (req, res, next) => {
  console.log("todo", req.body);
  if (!req.body.todoTitle) {
    res.status(404);
  } else {
    res.redirect("/");
  }
});

export default route;
