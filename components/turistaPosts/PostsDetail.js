import Link from "next/link";

const PostsDetail = (props) => {
  const deleteHandler = (event) => {
    event.preventDefault();
    const postId = props.id;

    props.onDeletePost(postId);
  };

  return (
    <section
      key={props.id}
      className="drop-shadow-lg shadow-white/20 grid lg:grid-cols-4"
    >
      <div className="p-2.5 lg:col-start-4 lg:order-2 bg-zinc-600 relative">
        <h1 className="text-zinc-50 font-semibold">{props.title}</h1>
        <p className="text-xs -mt-1 text-zinc-50/30 font-light">
          {props.location}
        </p>
        <p className="mt-2 text-zinc-100 text-base font-light">
          {props.description}
        </p>
        <button className="bg-white text-black py-1 my-4 absolute bottom-0 w-full hidden lg:block">
          <Link href="/">Back</Link>
        </button>
      </div>
      <img
        className="lg:col-span-3 lg:order-1 animated-slide"
        src={props.image}
        alt={props.title}
      />
      <button
        className="bg-red-900 text-black px-2 py-1 lg:hidden"
        onClick={deleteHandler}
      >
        Delete
      </button>
      <button className="bg-blue-900 text-white px-2 py-1 lg:hidden">
        <Link href={`/update-post/${props.id}`}>Edit</Link>
      </button>
      <button className="bg-white text-black px-2 py-1 lg:hidden">
        <Link href="/">Back</Link>
      </button>
    </section>
  );
};

export default PostsDetail;
