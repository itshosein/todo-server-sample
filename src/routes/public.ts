import express, { NextFunction, Request, Response } from "express";
import { __dirname } from "../app.js";

const route = express.Router();

route.get("/", (req: Request, res: Response) => {
  // console.log("main route handler", __dirname);
  // res.sendFile(path.join("views", "index.html"), { root: "./src" });
  const ip = req.headers['x-forwarded-for'] ||
     req.socket.remoteAddress ||
     null;

  
  res.render("index",{pageTitle: "Todo App",path: "/", todos: [{
    title: "test1",
    desc: "test1 test2 yd qiuw hqdwd"
  }]})
});

export default route;
