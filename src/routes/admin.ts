import express from "express";
import todoController from "../controllers/todo";

const route = express.Router();

route.get("/add-todo", todoController.getAddTodoPage);

route.post("/add-todo", todoController.saveTodo);

route.get("/delete-todo/:id", todoController.deleteTodo);

route.get("/edit-todo/:id", todoController.getEditTodoPage);

route.post("/edit-todo", todoController.editTodo);


export default route;
