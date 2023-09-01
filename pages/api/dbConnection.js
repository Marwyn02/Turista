import Post from "@/models/Post";
import User from "@/models/User";

import deleteOneFromDatabase from "./deleteOneFromDatabase";
import { insertToDatabase } from "./insertToDatabase";
import updateFromDatabase from "./updateFromDatabase";

const dbConnection = async (req, res) => {
  if (req.body.type === "POSTS") {
    // Inserting post data to database block

    try {
      const post = new Post(req.body);
      const collectionName = "post_collection";
      const result = await insertToDatabase(collectionName, post);
      res.status(201).json({ success: true, message: "Post Created" + result });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Post not created: " + err });
    }
  } else if (req.body.type === "USERS") {
    // Inserting user data to database block

    try {
      const user = new User(req.body);
      const collectionName = "user_collection";
      const result = await insertToDatabase(collectionName, user);
      res.status(201).json({ success: true, message: "User Created" + result });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "User not created: " + err });
    }
  } else if (req.method === "DELETE") {
    // Deleting post from the database block

    try {
      const postId = req.body.postId;
      const collectionName = "post_collection";
      const deletedPost = await deleteOneFromDatabase(collectionName, postId);
      res
        .status(201)
        .json({ success: true, message: "Post Deleted: " + deletedPost });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Deleting Error: " + err });
    }
  } else if (req.method === "PUT") {
    // Updating post to the database block
    try {
      const updatedPostBody = req.body;
      const updatedPost = await updateFromDatabase(updatedPostBody);
      res
        .status(201)
        .json({ success: true, message: "Post Updated: " + updatedPost });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Post Update Failed: " + err });
    }
  } else {
    // Error block
    res.status(500).json({ message: "Server Error" });
  }
};

export default dbConnection;
