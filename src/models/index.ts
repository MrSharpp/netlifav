import { Movie } from "./Movie";
import { Profile } from "./Profile";
import { User } from "./User";

export { Profile };
export { User };
export { Movie };

User.hasOne(Profile, {
  onDelete: "CASCADE",
});

User.hasMany(Movie);

Profile.belongsTo(User, {
  onDelete: "CASCADE",
});

Movie.belongsTo(User, {
  onDelete: "CASCADE",
});
