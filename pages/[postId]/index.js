import { Fragment } from "react";
import { connectMongoDB } from "../../lib/connectMongoDB";
import getOne from "../api/getOne";
import PostsDetail from "@/components/turistaPosts/PostsDetail";
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
      throw new Error("Error in delete-post: ", e);
    }
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
  try {
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
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: {
        postData: [],
      },
      revalidate: 1,
    };
  }
}

export default index;
