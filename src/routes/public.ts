import express, { NextFunction, Request, Response } from "express";

const route = express.Router();

route.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("main route handler");
  res.send("<h1>hello from express</h1>");
});

export default route;
