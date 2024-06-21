import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true },
  firstname: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // photo: { type: String },
});

const User = models?.User || model("User", UserSchema);

export default User;
