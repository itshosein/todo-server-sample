import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import uniqId from "uniqid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToFile = path.join(__dirname, "..", "..", "data", "todos.json");

export default class Todo {
  private _id: string;
  constructor(private _title: string, private _desc: string) {
    this._id = uniqId();
  }

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

  public get id(): string {
    return this._id;
  }
  public set id(id: string) {
    this._id = id;
  }

  public save(afterSave: (err: Error | null) => void) {
    let todos: { id: string; title: string; desc: string }[] = [];
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        return;
      }
      if (data.length) {
        todos = JSON.parse(data.toString());
      }
      todos.push({
        title: this.title,
        desc: this.desc,
        id: this.id
      });
      fs.writeFile(pathToFile, JSON.stringify(todos), afterSave);
    });
  }

  public static getAllTodos(): Todo[] {
    let todos: Todo[] = [];
    fs.readFile(pathToFile, (err, data) => {
      if (err || !data.length) {
        return;
      }
      todos = JSON.parse(data.toString());
    });
    return todos;
  }

  // public deleteTodo(id: string) {
  //   let todo: Todo|null = null;
  //   fs.readFile(pathToFile, (err,data) => {

  //   });


  // }
}
