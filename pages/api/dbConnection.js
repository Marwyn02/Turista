import Post from "@/models/Post";
import { insertToDatabase } from "./insertToDatabase";

const dbConnection = async (req, res) => {
  if (req.method === "POST") {
    // Inserting data to database block
    try {
      const post = new Post(req.body);
      const collectionName = "post_collection";
      const result = await insertToDatabase(collectionName, post);
      console.log("POST:", result);
      res.status(201).json({ success: true, message: "Post inserted!" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    // Error block
    res.status(400).json({ success: false, message: "Invalid request method" });
  }
};

export default dbConnection;
