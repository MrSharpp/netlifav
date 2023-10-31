import express from "express";
import { config } from "@configs/config";
import { routerV1 } from "@routes";

const app = express();

app.use(routerV1);

app.listen(config.PORT);
