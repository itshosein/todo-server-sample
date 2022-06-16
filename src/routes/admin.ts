import express from "express";
import todoController from "../controllers/todo";

const route = express.Router();

route.get("/add-todo", todoController.getAddTodoPage);

route.post("/add-todo", todoController.saveTodo);

route.get("/delete-todo/:id", todoController.deleteTodo);


export default route;
