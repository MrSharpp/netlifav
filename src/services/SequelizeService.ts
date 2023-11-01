import { config } from "@configs/config";
import { Dialect, Sequelize } from "sequelize";

require("pg").defaults.parseInt8 = true;

const sequelize = new Sequelize(
  "postgres",
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    port: Number(process.env.DB_PORT),
    host: config.DB_HOST,
    dialect: "postgres" as Dialect,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
    logging: function (str) {
      if (String(config.ORM_LOGGING) === "true") {
        console.info(str);
      }
    },
  }
);

export { sequelize };
