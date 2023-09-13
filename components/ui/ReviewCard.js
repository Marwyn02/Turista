import { useRouter } from "next/router";

const ReviewCard = ({ id, postId, title, description, name }) => {
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
    <div key={id} className="border p-2 my-1">
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm mt-1">{description}</p>
      <p className="text-sm text-gray-400 mt-1">- {name}</p>
      <button
        onClick={deleteReviewHandler}
        className="text-xs bg-red-400 rounded text-white px-2 py-1 mt-3"
      >
        Delete
      </button>
    </div>
  );
};

export default ReviewCard;
