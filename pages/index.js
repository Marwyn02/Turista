import PostsList from "@/components/turistaPosts/PostsList";
import Link from "next/link";
import { getFromDatabase } from "./api/getFromDatabase";

const Home = (props) => {
  return (
    <div>
      Home
      <div className="py-1.5 px-5 text-sm rounded bg-indigo-700 w-max my-2">
        <Link href="/new-post">Create new post</Link>
      </div>
      <PostsList posts={props.posts} />
    </div>
  );
};

export async function getStaticProps() {
  try {
    const collectionName = "post_collection";
    const posts = await getFromDatabase(collectionName);

    return {
      props: {
        posts: posts.map((post) => ({
          title: post.title,
          location: post.location,
          image: post.image,
          description: post.description,
          amenities: post.amenities.map((amenity) => ({
            name: amenity.name,
            checked: amenity.checked,
          })),
          id: post._id.toString(),
        })),
      },
      revalidate: 1,
    };
  } catch (err) {
    return {
      props: {
        posts: [],
      },
      revalidate: 1,
    };
  }
}

export default Home;
