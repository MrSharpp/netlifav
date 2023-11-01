import { sequelize } from "@services";
import { hashPassword } from "@utils/hashPassword";
import { DataTypes, Model, Sequelize } from "sequelize";
import { Profile } from "@models";
import { HasOne } from "sequelize-typescript";

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal("gen_random_uuid()"),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    hooks: {
      async beforeSave(instance, options) {
        instance.setDataValue(
          "password",
          await hashPassword(instance.getDataValue("password"))
        );
      },
    },
  }
);
