import getOneFromDatabase from "../api/getOneFromDatabase";
import { connectToDatabase } from "../api/connectToDatabase";
import PostsDetail from "@/components/turistaPosts/PostsDetail";
import { Fragment } from "react";

const index = (props) => {
  return (
    <Fragment>
      <PostsDetail
        id={props.postData.id}
        title={props.postData.title}
        location={props.postData.location}
        image={props.postData.image}
        description={props.postData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const { client, db } = await connectToDatabase();
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
  const collectionName = "post_collection";
  const selectedResult = await getOneFromDatabase(collectionName, postId);
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
