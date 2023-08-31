import EditPost from "@/components/form/EditPost";
import { useRouter } from "next/router";
import { connectMongoDB } from "@/pages/api/connectMongoDB";
import getOne from "@/pages/api/getOne";
import Link from "next/link";

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
    console.log("ERROR:", error);
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
    };
  } catch (error) {
    console.log("ERROR:", error);
  }
}

export default function editPost(props) {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return (
    <>
      <p>{props.postData.id}</p>
      <div className="text-white">{props.postData.title}</div>
      <Link href="/">Back</Link>
    </>
  );
  // return <>{id && <EditPostContainer id={id} />}</>;
}

// async function EditPostContainer({ id }) {
//   //   console.log("Hello");
//   try {
//     const data = await getEditPost({ id });
//     const { title, location, image, description } = data;

//     return (
//       <EditPost
//         id={id}
//         title={title}
//         location={location}
//         image={image}
//         description={description}
//       />
//     );
//   } catch (error) {
//     console.error("Error fetching edit post data:", error);
//     return <p>Error loading post data.</p>;
//   }
// }
