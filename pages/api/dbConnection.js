import Post from "@/models/Post";
import User from "@/models/User";
import { insertToDatabase } from "./insertToDatabase";
import deleteOneFromDatabase from "./deleteOneFromDatabase";
import { connectMongoDB } from "./connectMongoDB";
import updateFromDatabase from "./updateFromDatabase";
import { NextResponse } from "next/server";
import getOne from "./getOne";

const dbConnection = async (req, res, { params }) => {
  if (req.body.type === "POSTS") {
    // Inserting post data to database block
    try {
      const post = new Post(req.body);
      const collectionName = "post_collection";
      const result = await insertToDatabase(collectionName, post);
      // console.log("POST:", result);
      // res.status(201).json({ success: true, message: "Post inserted!" });
      return NextResponse.json({ message: "Post Created" }, { status: 201 });
    } catch (err) {
      // res.status(500).json({ success: false, message: "Server error" });
      return NextResponse.json(
        { message: "Post not created" },
        { status: 500 }
      );
    }
  } else if (req.body.type === "USERS") {
    // Inserting user data to database block
    try {
      const user = new User(req.body);
      const collectionName = "user_collection";
      const result = await insertToDatabase(collectionName, user);
      // console.log("USER:", result);
      return NextResponse.json({ message: "User Created" }, { status: 201 });
    } catch (err) {
      return NextResponse.json(
        { message: "User Not Created" },
        { status: 500 }
      );
    }
  } else if (req.method === "DELETE") {
    // Deleting post from the database block
    try {
      const postId = req.body.postId;
      const collectionName = "post_collection";
      const deletedPost = await deleteOneFromDatabase(collectionName, postId);
      // console.log("DELETE:", deletedPost);
      return NextResponse.json({ message: "Post Deleted" }, { status: 201 });
    } catch (err) {
      return NextResponse.json({ message: "Deleting Error" }, { status: 500 });
    }
  } else if (req.method === "PUT") {
    try {
      const { postId } = params;
      const collectionName = "post_collection";
      const data = await getOne(collectionName, postId);
      const { client, db } = await connectMongoDB();
      const result = await updateFromDatabase(collectionName, postId, data);
    } catch (error) {}
  } else {
    // Error block
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  }
};

export default dbConnection;
