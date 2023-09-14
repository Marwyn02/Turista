import Link from "next/link";

const ReviewDetail = ({ id, user, description, postId }) => {
  return (
    <div className="grid h-screen">
      <div className="place-self-center border border-black p-5">
        <div>ReviewDetail</div>
        <p>{id}</p>
        <h1>{user}</h1>
        <p>{description}</p>
        <Link href={`/${postId}`} className="border border-black px-2">
          Back
        </Link>
      </div>
    </div>
  );
};

export default ReviewDetail;
