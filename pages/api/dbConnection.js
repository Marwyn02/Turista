import Post from "@/models/Post";
import User from "@/models/User";
import { insertToDatabase } from "./insertToDatabase";

const dbConnection = async (req, res) => {
  if (req.body.type === "POSTS") {
    // Inserting post data to database block
    try {
      const post = new Post(req.body);
      const collectionName = "post_collection";
      const result = await insertToDatabase(collectionName, post);
      // console.log("POST:", result);
      res.status(201).json({ success: true, message: "Post inserted!" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else if (req.body.type === "USERS") {
    // Inserting user data to database block
    try {
      const user = new User(req.body);
      const collectionName = "user_collection";
      const result = await insertToDatabase(collectionName, user);
      // console.log("USER:", result);
      res.status(201).json({ success: true, message: "User created" });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Account creation error" });
    }
  } else {
    // Error block
    res.status(400).json({ success: false, message: "Invalid request method" });
  }
};

export default dbConnection;
