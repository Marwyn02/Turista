import mongoose from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

export const connectMongoDB = async (): Promise<void> => {
  await mongoose.connect(MONGODB_URI);
};
