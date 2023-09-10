import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const PostsDetail = (props) => {
  const router = useRouter();
  const [hasImage, setHasImage] = useState(true);

  useEffect(() => {
    if (props.image === "") {
      setHasImage(false);
    }
  }, [props.image]);

  const deleteHandler = async (event) => {
    event.preventDefault();
    const postId = props.id;

    try {
      const response = await fetch(`/api/post/delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      } else {
        router.push("/");
      }
    } catch (error) {
      throw new Error("Error in delete Post: " + error);
    }
  };

  return (
    <section
      key={props.id}
      className="grid md:grid-cols-12 gap-x-2 drop-shadow-lg shadow-white/20 py-5 sm:py-8 md:py-10 lg:py-16"
    >
      <div className="md:col-span-7 md:col-start-2 bg-white relative rounded-t-xl md:rounded-xl">
        {hasImage && (
          <img
            className="lg:col-span-3 lg:order-1 animated-slide rounded-t-xl"
            src={props.image}
            alt={props.title}
          />
        )}
        <div className="p-2.5">
          <h1 className="text-zinc-700 font-semibold">{props.title}</h1>
          <p className="text-xs -mt-1 text-zinc-900/50 font-light">
            {props.location}
          </p>
          <div className="flex gap-x-2 mt-2">
            {props.amenities &&
              props.amenities
                .filter((item) => item.checked)
                .map((item) => (
                  <div
                    key={item.id}
                    className="text-gray-600 text-xs border-blue-300 bg-gray-50 border rounded-xl px-1.5 py-0.5"
                  >
                    {item.name}
                  </div>
                ))}
          </div>
          <p className="text-xs mt-2 mb-0.5 text-gray-500">
            - {props.user ? props.user : "Anonymous"}
          </p>
          <hr className="mt-3"></hr>
          <p className="mt-2 text-zinc-600 text-base font-light">
            {props.description}
          </p>
        </div>
        <div className="mt-5 pb-3 px-2 flex justify-start gap-x-1.5">
          <Link href="/">
            <button className="bg-gray-200 text-black px-2 md:px-6 py-1 rounded-lg text-sm">
              Back
            </button>
          </Link>
          <button
            className="bg-red-900 text-gray-100 px-2 md:px-6 py-1 rounded-lg text-sm"
            onClick={deleteHandler}
          >
            Delete post
          </button>

          <Link href={`/update-post/${props.id}`}>
            <button className="bg-blue-900 text-white px-2 md:px-6 py-1 rounded-lg text-sm">
              Edit post
            </button>
          </Link>
        </div>
      </div>
      <aside className="md:col-span-3 bg-white p-3 rounded-b-xl md:rounded-none">
        <h2 className="font-bold">Review:</h2>
        <textarea
          type="text"
          rows="1"
          cols="30"
          className="border border-gray-300 mb-5 p-2 text-sm"
          placeholder="Write your review here..."
        ></textarea>
        <hr></hr>
      </aside>
    </section>
  );
};

export default PostsDetail;
