import { Movie } from "./Movie";
import { User } from "./User";

export { User };
export { Movie };

User.hasMany(Movie);

Movie.belongsTo(User, {
  onDelete: "CASCADE",
});
