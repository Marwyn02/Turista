// import { connectMongoDB } from "@/lib/connectMongoDB";
// import mongoose from "mongoose";

// export default async function insert({ req, res }: any) {
//   try {
//     await connectMongoDB();
//     const usersCollection = mongoose.connection.db.collection("users");

//     const result = await usersCollection.updateMany(
//       { cover_photo: { $exists: false } },
//       { $set: { cover_photo: "" } }
//     );
//     console.log(`Inserted ${result.upsertedCount} documents`);

//     console.log("Documents updated successfully!");
//   } catch (error) {
//     console.log("Failed to update user data.");
//   }
// }
