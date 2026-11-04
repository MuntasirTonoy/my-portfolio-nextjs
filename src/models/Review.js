import mongoose from "mongoose";

const httpsUrl = {
  validator: (v) => !v || /^https:\/\/\S+$/.test(v),
  message: "Avatar must be an https URL",
};

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    role: { type: String, required: true, trim: true, maxlength: 100 },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    review: { type: String, required: true, trim: true, minlength: 10, maxlength: 1000 },
    avatar: { type: String, trim: true, maxlength: 500, validate: httpsUrl },
    // New reviews wait for approval in the admin dashboard.
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

reviewSchema.index({ isPublished: 1, createdAt: -1 });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
