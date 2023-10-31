import express from "express";
import { config } from "@configs/config";
import { routerV1 } from "@routes";

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(routerV1);

app.listen(config.PORT);
