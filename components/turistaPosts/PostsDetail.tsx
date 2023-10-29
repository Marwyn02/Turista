import { FC, Suspense } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";

import PostsReview from "./PostsReview";
import PostImages from "./PostUI/PostImages";
import ReviewList from "../review/ReviewList";
import PostsDetailNavigation from "./PostUI/PostsDetailNavigation";

type Images = {
  image: string;
  public_id: string;
};

type Amenities = {
  name: string;
  description: string;
  checked: boolean;
  id: string;
};

type Reviews = {
  id: string;
  name: string;
  image: string;
  description: string;
  postId: string;
  userId: string;
};

type PostsDetailProps = {
  id: string;
  likes: string[];
  title: string;
  coordinate: {
    lng: number;
    lat: number;
  };
  location: string;
  image: Images[];
  description: string;
  amenities: Amenities[];
  user: string;
  userId: string;
  userImage: string;
  reviews: Reviews[];
};

const PostsDetail: FC<PostsDetailProps> = (props) => {
  const { data: session } = useSession();

  const PostsMap = dynamic(() => import("./PostUI/PostsMap"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });
  return (
    <section key={props.id} className="md:px-32 pt-5 md:pt-20">
      <main>
        <PostsDetailNavigation
          userId={props.userId}
          postId={props.id}
          likes={props.likes}
        />

        {/* Image */}
        <PostImages images={props.image} />

        {/* Post text details */}
        <div className="lg:flex lg:flex-row pt-4 md:pt-6 px-5 md:px-0 lg:pt-3">
          <div className="basis-auto lg:basis-7/12 lg:pr-14 relative">
            {/* Title and Dropdown */}
            <h1 className="post_title">{props.title}</h1>

            {/* Location   */}
            <p className="post_location">{props.location}</p>

            {/* User */}
            <div className="flex items-center mt-5 border-y py-5">
              <Link href={`/user/${props.userId}`}>
                <img
                  className="rounded-full h-10 w-10"
                  src={props.userImage}
                  alt="Profile"
                />
              </Link>
              <p className="text-base font-medium text-black/80 ml-4">
                Posted by{" "}
                <Link href={`/user/${props.userId}`}>
                  <span className="text-violet-500">
                    {props.user ? props.user : "Anonymous"}
                  </span>
                </Link>
              </p>
            </div>

            {/* Amenities */}
            <div className="py-6">
              <h3 className="font-medium text-lg">This place has</h3>
              <ul className="mt-2">
                {props.amenities &&
                  props.amenities
                    .filter((item) => item.checked)
                    .map((item) => (
                      <li
                        key={item.id}
                        className="text-black/80 font-light text-base py-1"
                      >
                        - {item.name}
                      </li>
                    ))}
              </ul>
            </div>

            {/* Description */}
            <p className="post_description">{props.description}</p>
          </div>

          {/* Map and Create Review */}
          <section className="basis-auto lg:basis-5/12">
            <PostsMap
              checkLat={props.coordinate.lat}
              checkLng={props.coordinate.lng}
            />
            {session && <PostsReview postId={props.id} />}
          </section>
        </div>
      </main>

      <aside className="bg-white py-3 px-5 md:px-0 rounded-b-xl md:rounded-none overflow-y-auto">
        <Suspense fallback={<p className="text-center">Loading reviews...</p>}>
          <ReviewList reviews={props.reviews} />
        </Suspense>
      </aside>
    </section>
  );
};

export default PostsDetail;
