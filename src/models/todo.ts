import fs from "fs";
import path from "path";
import uniqId from "uniqid";

const pathToFile = path.join(__dirname, "..", "data", "todos.json");

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
    Todo.getAllTodos((todosFromFile: Todo[]) => {
      todos = todosFromFile;
      todos.push({
        title: this.title,
        desc: this.desc,
        id: this.id,
      });
      fs.writeFile(pathToFile, JSON.stringify(todos), afterSave);
    });
  }

  public static getAllTodos(withTodo: (todos: Todo[]) => void) {
    let todos: Todo[] = [];
    fs.readFile(pathToFile, (err, data) => {
      if (err || !data.length) {
        withTodo([]);
        return;
      }
      todos = JSON.parse(data.toString());
      withTodo(todos);
      return;
    });
  }

  public static saveAll(todos: Todo[], afterSave: (err: Error | null) => void) {
    Todo.getAllTodos((savedTodo: Todo[]) => {
      todos = [...todos, ...savedTodo];
    });
    fs.writeFile(pathToFile, JSON.stringify(todos), afterSave);
  }

  public static getTodoById(id: string, withTodo: (todo: Todo) => void) {
    Todo.getAllTodos((todos) => {
      if (todos?.length) {
        let todo: Todo = todos.filter((todo) => todo.id === id)[0];
        withTodo(todo);
      }
    });
  }

  public static deleteTodo(
    id: string,
    deletedCallback: (isDone: boolean) => void
  ) {
    let todosDeleted: Todo[] | null = null;
    Todo.getAllTodos((todos) => {
      if (todos?.length) {
        todosDeleted = todos.filter((todo) => todo.id !== id);
        Todo.saveAll(todosDeleted, (err) => {
          if (err) {
            deletedCallback(false);
            console.log(err);
            return;
          }
          deletedCallback(true);
        });
      }
    });
  }
}
