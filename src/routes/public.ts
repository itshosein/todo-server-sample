import express from "express";
import todoController from "../controllers/todo";

const route = express.Router();

route.get("/", todoController.getTodos);

export default route;
