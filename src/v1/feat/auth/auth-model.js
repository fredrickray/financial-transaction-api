import { Schema, model } from "mongoose";
import { hashData } from "../../../middlewares/authMiddleware.js";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Exclude password before sending response to user
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.__v;
  delete userObject.password;
  delete userObject.createdAt;
  delete userObject.updatedAt;

  return userObject;
};

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await hashData(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

// Verify Password
userSchema.methods.isPasswordMatch = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const UserModel = model("User", userSchema);

export { UserModel };
