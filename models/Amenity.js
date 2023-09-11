import mongoose from "mongoose";

const AmenitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
  description: {
    type: String,
  },
});

export default mongoose.models.Amenity ||
  mongoose.model("Amenity", AmenitySchema);
