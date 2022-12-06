import { Schema, model } from "mongoose";
// import validator from 'validator';
import bcrypt from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password: string;
  comparePassword(password:string): Promise <boolean>
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    unique: true,
    // validate: {validator: validator.isEmail, message: "Please provide valid email",},
  },
  email: {
    type: String,
    required: [true, "Pleae provide a valid email"],
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  canditatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export default model<IUser>("User", UserSchema);
