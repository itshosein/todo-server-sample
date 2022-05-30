import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { __dirname } from "../app.js";

const route = express.Router();

route.get("/", (req: Request, res: Response) => {
  // console.log("main route handler", __dirname);
  // res.sendFile(path.join("views", "index.html"), { root: "./src" });
  res.render("index",{pageTitle: "Todo App"})
});

export default route;
