import fs from "fs";
import { __dirname } from "../app";
import path from "path";
const pathToFile = path.join(__dirname, "data", "todos.json");

export default class Todo {
  constructor(private _title: string, private _desc: string) {}

  public get title(): string {
    return this._title;
  }
  public set title(t: string) {
    if (t.length > 0) {
      this._title = t;
    } else {
      throw new Error("title can not be empty");
    }
  }

  public get desc(): string {
    return this._desc;
  }
  public set desc(t: string) {
    this._desc = t;
  }

  public save() {
    let todos: Todo[] = [];
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        return;
      }
      console.log(data);
      
      // todos = JSON.parse(data);
    });
    todos.push(this);
    fs.writeFile(pathToFile,JSON.stringify(todos),null,(err) => {
      if (err) {
        console.log(err);
      }
    })
  }

  public static fetchAllTodos(): Todo[] {
    let todos: Todo[] = [];

    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        return;
      }
      console.log(data);
      
      // todos = JSON.parse(data);
    });
    return todos;
  }
}
