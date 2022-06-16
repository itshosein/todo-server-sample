import express, { Express } from "express";
import bodyParser from "body-parser";
import path from "path";
import publicRoute from "./routes/public";
import adminRoute from "./routes/admin";
import 'dotenv/config';

const port = process.env.PORT || 3000;
const app: Express =  express();

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
  console.log("app started at !port", port, );
});
