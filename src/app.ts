import express, { Express } from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import publicRoute from "./routes/public.js";
import adminRoute from "./routes/admin.js";

const port = 3000;
const app: Express = express();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "views"));
app.set('trust proxy', true);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(publicRoute);
app.use("/admin", adminRoute);

app.use((req, res) => {
  // res.sendFile(path.join("views", "404.html"), { root: "./src" });
  res.render("404.ejs", { pageTitle: "404 Page",path:"" });
});

app.listen(port, () => {
  console.log("app started at port", port);
});
