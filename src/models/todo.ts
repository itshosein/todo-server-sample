import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToFile = path.join(__dirname, "..", "..", "data", "todos.json");

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

  public save(afterSave: (err: Error | null) => void) {
    let todos: Todo[] = [];
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        console.log("read Error", err);
        return;
      }

      if (data.length) {
        todos = JSON.parse(data.toString());
      }
      todos.push(this);
      console.log("JSON", JSON.stringify(todos));

      fs.writeFile(pathToFile, JSON.stringify(todos), afterSave);
    });
  }

  public static fetchAllTodos(withTodos: (todos: Todo[]) => void): Todo[] {
    let todos: Todo[] = [];

    fs.readFile(pathToFile, (err, data) => {
      if (err || !data.length) {
        withTodos([]);
        return;
      }
      todos = JSON.parse(data.toString());
      if (typeof withTodos === "function") {
        withTodos(todos);
      }
    });
    return todos;
  }
}
