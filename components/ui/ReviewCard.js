import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

const ReviewCard = ({ id, postId, description, name }) => {
  const router = useRouter();
  const dropdownRef = useRef();
  const buttonRef = useRef();
  const [dropdown, setDropdown] = useState(false);
  const [editReview, setEditReview] = useState(false);

  const [newDescription, setNewDescription] = useState(description);

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

  const reviewHandlerSubmit = async (e) => {
    e.preventDefault();

    const updatedReview = {
      id: id,
      postId: postId,
      description: newDescription,
    };

    try {
      const response = await fetch(`/api/review/edit`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedReview),
      });

      if (!response.ok) {
        throw new Error("Failed to edit review");
      } else {
        setEditReview(false);
        setNewDescription("");
        router.replace(`/${postId}`);
      }
    } catch (error) {
      // throw new Error("Error in Edit Review: " + error);
      console.log(error);
    }
  };

  // Hide the dropdown when the user clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (editReview) {
    return (
      <div
        key={id}
        className="relative my-2 border border-transparent hover:border-black/70 rounded-lg duration-300 cursor-pointer"
      >
        <div className="bg-gray-100 rounded-lg p-1.5 ">
          <div className="flex justify-between pl-3">
            <p className="text-sm font-medium text-gray-900 mb-0.5">{name}</p>
            <img
              src="/horizontal-dots.svg"
              alt="lel"
              height={23}
              width={23}
              className="hover:bg-gray-200"
              ref={buttonRef}
              onClick={() => setDropdown(!dropdown)}
            />
          </div>

          {dropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-2 bg-white rounded border w-32 z-[9999]"
            >
              <ul className="text-sm text-slate-700">
                <li
                  onClick={() => setEditReview(!editReview)}
                  className="hover:bg-gray-200 hover:text-black py-1.5 pl-4"
                >
                  Edit
                </li>
                <li
                  onClick={deleteReviewHandler}
                  className="hover:bg-gray-200 hover:text-black py-1.5 pl-4"
                >
                  Delete
                </li>
              </ul>
            </div>
          )}

          <form
            onSubmit={reviewHandlerSubmit}
            className="flex w-full my-2 mx-2"
          >
            <input
              type="text"
              id="description"
              name="description"
              className="text-sm py-1.5 px-3 rounded-l-lg text-gray-600 border-black border placeholder:text-gray-400"
              placeholder="Edit your review here"
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
            />
            <button
              type="submit"
              className="bg-gray-700 text-white rounded-r-lg px-4 text-sm"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div
      key={id}
      className="relative my-2 border border-transparent hover:border-black/70 rounded-lg duration-300 cursor-pointer"
    >
      <div className="pl-3 bg-gray-100 rounded-lg p-1.5 ">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-gray-900 mb-0.5">{name}</p>
          <img
            src="/horizontal-dots.svg"
            alt="lel"
            height={23}
            width={23}
            className="hover:bg-gray-200"
            ref={buttonRef}
            onClick={() => setDropdown(!dropdown)}
          />
        </div>

        {dropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-2 bg-white rounded border w-32 z-[9999]"
          >
            <ul className="text-sm text-slate-700">
              <li
                onClick={() => setEditReview(!editReview)}
                className="hover:bg-gray-200 hover:text-black py-1.5 pl-4"
              >
                Edit
              </li>
              <li
                onClick={deleteReviewHandler}
                className="hover:bg-gray-200 hover:text-black py-1.5 pl-4"
              >
                Delete
              </li>
            </ul>
          </div>
        )}

        <p className="text-sm mt-2 mb-0.5 text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
