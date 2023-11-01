import { sequelize } from "./SequelizeService";
import { DataTypes, Model, Sequelize } from "sequelize";

export class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);
