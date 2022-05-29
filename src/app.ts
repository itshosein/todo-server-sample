import express, { Express } from "express";
import bodyParser from "body-parser";
import path from "path";
import publicRoute from "./routes/public.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const port = 3000;
const app: Express = express();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(publicRoute);

app.listen(port, () => {
  console.log("app started at port", port);
});
