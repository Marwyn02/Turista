import Link from "next/link";
import { useRouter } from "next/router";

const ReviewCard = ({ id, postId, description, name }) => {
  const router = useRouter();

  const deleteReviewHandler = async () => {
    try {
      const response = await fetch(`/api/review/delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      } else {
        router.push(`/${postId}`);
      }
    } catch (error) {
      throw new Error("Error in delete Review: ", error);
    }
  };
  return (
    <div
      key={id}
      className="my-2 border border-transparent hover:border-black/70 rounded-lg duration-300"
    >
      <div className="pl-3 bg-gray-100 rounded-lg p-1.5">
        <p className="text-sm font-medium text-gray-900 mb-0.5">{name}</p>
        <p className="text-sm mt-1 text-gray-800">{description}</p>
      </div>
      <button
        onClick={deleteReviewHandler}
        className="text-xs bg-red-400 rounded text-white px-2 py-0.5 mt-2 mb-1 ml-1"
      >
        Delete
      </button>
      <Link href={`/${postId}/${id}`}>
        <button className="text-xs bg-blue-400 rounded text-white px-2 py-0.5 mt-2 mb-1 ml-1">
          Edit
        </button>
      </Link>
    </div>
  );
};

export default ReviewCard;
