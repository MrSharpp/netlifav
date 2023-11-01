import { sequelize } from "./SequelizeService";
import { DataTypes, Model, Sequelize } from "sequelize";

export class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    cast: {
      type: DataTypes.STRING,
      allowNull: false,
      get(): string[] {
        return this.getDataValue("cast").split(",");
      },
      set(casts: string[]) {
        this.setDataValue("cast", casts.join(","));
      },
    },
    genre: {
      // i can create an index to optimize and query by genre
      type: DataTypes.CHAR,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);
