import express from "express";
import path from "path";
import { __dirname } from "../app.js";

const route = express.Router();

route.get("/add-todo", (req, res) => {
  res.sendFile(path.join("views", "add-todo.html"), { root: "./src" });
});

export default route;
