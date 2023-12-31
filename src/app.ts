import { config } from "@configs/config";
import express from "express";
import { router } from "@routes";
import path from "path";
import { sequelize } from "@models/SequelizeService";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

// it adds a middleware which preseves the session
app.use(
  session({
    secret: config.APP_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// connect to db
sequelize.sync().then(
  function () {
    console.log("DB connection success.");
  },
  function (err) {
    console.log(err);
  }
);

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(router);

app.listen(config.PORT);
