import express from "express";
import { __dirname } from "../app.js";
import todoController from "../controllers/todo.js";

const route = express.Router();

route.get("/", todoController.getTodos);

export default route;
