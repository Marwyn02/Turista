import { connectMongoDB } from "@/pages/api/connectMongoDB";
import EditPost from "@/components/form/EditPost";
import { Fragment } from "react";
import getOne from "@/pages/api/getOne";

export async function getStaticPaths() {
  try {
    const { client, db } = await connectMongoDB();
    const collectionName = "post_collection";
    const postsCollection = db.collection(collectionName);
    const posts = await postsCollection.find({}).toArray();
    client.close();

    return {
      fallback: "blocking",
      paths: posts.map((post) => ({
        params: { id: post._id.toString() },
      })),
    };
  } catch (error) {
    throw new Error("Error in update-post getStaticPaths: ", error);
  }
}

export async function getStaticProps(context) {
  try {
    const postId = context.params.id;
    const selectedResult = await getOne(postId);

    if (!selectedResult) {
      return { notFound: true }; // Return a 404 page
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

const editPost = (props) => {
  try {
    return (
      <Fragment>
        <EditPost
          id={props.postData.id}
          title={props.postData.title}
          location={props.postData.location}
          image={props.postData.image}
          description={props.postData.description}
        />
      </Fragment>
    );
  } catch (error) {
    throw new Error("Error fetching edit post data: ", error);
  }
};

export default editPost;
