import { connectMongoDB } from "@/lib/connectMongoDB";
import EditPost from "@/components/form/EditPost";
import MainLayout from "@/components/layout/MainLayout";
import FindOne from "@/pages/api/post/findOne";
import mongoose from "mongoose";

export async function getStaticPaths() {
  try {
    await connectMongoDB();
    const postsCollection = mongoose.connection.db.collection("posts");
    const posts = await postsCollection.find({}).toArray();
    return {
      fallback: "blocking",
      paths: posts.map((post) => ({
        params: { id: post._id.toString() },
      })),
    };
  } catch (error) {
    // throw new Error("Error in update-post getStaticPaths: ", error);
    console.log("Getting error here: ", error);
  }
}

export async function getStaticProps(context) {
  try {
    const postId = context.params.id;
    const selectedResult = await FindOne(postId);

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
      <MainLayout>
        <EditPost
          id={props.postData.id}
          title={props.postData.title}
          location={props.postData.location}
          image={props.postData.image}
          description={props.postData.description}
        />
      </MainLayout>
    );
  } catch (error) {
    throw new Error("Error fetching edit post data: ", error);
  }
};

export default editPost;
