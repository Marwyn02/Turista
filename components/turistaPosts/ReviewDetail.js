import Link from "next/link";

const ReviewDetail = ({ description, postId, username }) => {
  return (
    <div className="grid h-screen">
      <div className="place-self-center border rounded-lg w-full md:w-1/2 border-black p-5 bg-white">
        <h1 className="font-semibold ml-2">{username}</h1>
        <div className="bg-gray-200 rounded-xl px-4 py-2 mt-0.5 mb-3">
          <p>{description}</p>
        </div>
        <Link href={`/${postId}`} className="border border-black px-2">
          Back
        </Link>
      </div>
    </div>
  );
};

export default ReviewDetail;
