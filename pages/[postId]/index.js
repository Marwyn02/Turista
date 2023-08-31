import getOne from "../api/getOne";
import { connectMongoDB } from "../api/connectMongoDB";
import PostsDetail from "@/components/turistaPosts/PostsDetail";
import { Fragment } from "react";
import { useRouter } from "next/router";

const index = (props) => {
  const router = useRouter();
  const deletePostHandler = async (postId) => {
    try {
      const response = await fetch(`/api/dbConnection`, {
        method: "DELETE",
        body: JSON.stringify({ postId }),
        headers: { "Content-Type": "application/json" },
      });
      router.push("/");
    } catch (e) {
      console.log(e, "Error in delete-post");
    }
  };
  const editPostHandler = (postId) => {
    const id = postId;
    // console.log(id);
    // return props.onEditPost(id);
  };
  return (
    <Fragment>
      <PostsDetail
        id={props.postData.id}
        title={props.postData.title}
        location={props.postData.location}
        image={props.postData.image}
        description={props.postData.description}
        onDeletePost={deletePostHandler}
        onEditPost={editPostHandler}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const { client, db } = await connectMongoDB();
  const collectionName = "post_collection";
  const postsCollection = db.collection(collectionName);
  const posts = await postsCollection.find({}).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: posts.map((post) => ({
      params: { postId: post._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const postId = context.params.postId;
  const selectedResult = await getOne(postId);
  if (!selectedResult) {
    return {
      notFound: true, // Return a 404 page
    };
  }
  return {
    props: {
      postData: {
        id: selectedResult._id.toString(),
        title: selectedResult.title,
        location: selectedResult.location,
        image: selectedResult.image,
        description: selectedResult.description,
      },
    },
  };
}

export default index;
