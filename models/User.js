import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    image: {
      type: Array,
      trim: true,
    },
    cover_photo: {
      image: { type: String },
      public_id: { type: String },
    },
    provider: {
      type: String,
    },
    followers: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
