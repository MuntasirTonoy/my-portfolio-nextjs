import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Case-insensitive lookup so "Me@Example.com" and "me@example.com" match.
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: String(email).trim() }).collation({ locale: "en", strength: 2 });
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.models.User || mongoose.model("User", userSchema);
