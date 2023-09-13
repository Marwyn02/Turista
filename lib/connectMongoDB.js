import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

const options = { useUnifiedTopology: true, useNewUrlParser: true };

export const connectMongoDB = async () => {
  await mongoose.connect(MONGODB_URI, options);
};
