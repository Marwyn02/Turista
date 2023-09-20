import mongoose from "mongoose";
import Amenity from "./Amenity";
import Review from "./Review";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      maxlength: [60, "No more than 60 characters"],
    },
    coordinate: {
      lng: { type: Number },
      lat: { type: Number },
    },
    location: {
      type: String,
      required: [true, "Please specify a location"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image for your post"],
    },
    amenities: [Amenity.schema],
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true, "Each post must be linked to a user"],
    },
    reviews: [Review.schema],
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
