import express from "express";
import { config } from "@configs/config";
import { routerV1 } from "@routes";
import path from "path";

const app = express();

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(routerV1);

app.listen(config.PORT);
