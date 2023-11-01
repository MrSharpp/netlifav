import { Profile } from "./Profile";
import { User } from "./User";

export { Profile };
export { User };

User.hasOne(Profile, {
  onDelete: "CASCADE",
});
Profile.belongsTo(User, {
  onDelete: "CASCADE",
});
