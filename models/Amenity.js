import mongoose from "mongoose";

const AmenitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
});

export default mongoose.models.Amenity ||
  mongoose.model("Amenity", AmenitySchema);
