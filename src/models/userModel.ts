import mongoose from "mongoose";
import { SignJWT } from "jose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Name"],
    },
    password: {
      type: String,
      required: [true, "Please provide a Password"],
    },
    email: {
      type: String,
      required: [true, "Please provide a Email"],
      unique: true,
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //hash password
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return await new SignJWT({
    _id: this._id,
    email: this.email,
    name: this.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRY!)
    .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
};
userSchema.methods.generateRefreshToken = async function () {
  return await new SignJWT({
    _id: this._id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRY!)
    .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
};

userSchema.methods.generateAccessAndRefereshTokens = async function () {
  const accessToken = await this.generateAccessToken();
  const refreshToken = await this.generateRefreshToken();
  this.refreshToken = refreshToken;
  this.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
