import express from "express";
import { __dirname } from "../app.js";
import todoController from "../controllers/todo.js";

const route = express.Router();

route.get("/add-todo", todoController.getAddTodoPage);

route.post("/add-todo", todoController.saveTodo);

export default route;
