import React, { useState, useEffect, useRef, FC, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

interface ReviewCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  postId: string;
  userId: string;
}

//
//
// - This component is responsible for displaying the reviews to review cards
// Edit and delete the specific review in a post
//
//

const ReviewCard: FC<ReviewCardProps> = ({
  id,
  name,
  image,
  description,
  postId,
  userId,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLImageElement>(null);
  const [activeSession, setActiveSession] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [editReview, setEditReview] = useState<boolean>(false);

  const [newDescription, setNewDescription] = useState<string>(description);

  // This function will delete review from the post
  const deleteReviewHandler = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/review/delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, postId }),
      }).then((r) => r.json());

      if (!response.success) {
        throw new Error(response.message);
      }

      location.reload();
      console.log(response.message);
    } catch (error: any) {
      throw new Error("Error in Delete Review Handler: ", error);
    }
  };

  // Submitting the edited review
  const reviewHandlerSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
      }).then((r) => r.json());

      if (!response.success) {
        throw new Error(response.message);
      }

      setEditReview(false);
      console.log(response.message);
      location.reload();
    } catch (error: any) {
      throw new Error("Error in Edit Review Handler: ", error);
    }
  };

  // This function is to show and hide the dropdown menu
  const showHideDropdown = (): void => {
    setEditReview(!editReview);
    setDropdown(false);
  };

  // This feature hides the dropdown when the user clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // This function checks if the user active is same with review creator
  // To show the edit and delete buttons, only for the creator
  useEffect(() => {
    if (session && (session.user as { _id: string })._id === userId) {
      setActiveSession(true);
    }
  }, [session, userId]);

  if (editReview) {
    return (
      <>
        <div
          key={id}
          className="relative my-2 rounded-lg duration-300 bg-gray-100 p-1.5"
        >
          <div className="flex justify-between px-3">
            <p className="text-sm font-medium text-gray-900 mb-0.5">{name}</p>
            <img
              src="/xmark.svg"
              height={20}
              width={20}
              alt="lel"
              className="hover:bg-gray-200"
              onClick={showHideDropdown}
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
                  className="cursor-pointer hover:bg-gray-200 hover:text-black 
                            py-1.5 pl-2 flex duration-300"
                >
                  <img
                    src="/pen.svg"
                    height={18}
                    width={18}
                    alt="lel"
                    className="mr-1.5"
                  />{" "}
                  Edit
                </li>
                <li
                  onClick={deleteReviewHandler}
                  className="cursor-pointer hover:bg-gray-200 hover:text-black 
                            py-1.5 pl-2 flex duration-300"
                >
                  <img
                    src="/trash.svg"
                    height={18}
                    width={18}
                    alt="lel"
                    className="mr-1.5"
                  />{" "}
                  Delete
                </li>
              </ul>
            </div>
          )}

          <form
            onSubmit={reviewHandlerSubmit}
            className="w-full rounded-lg p-1.5"
          >
            <div>
              <textarea
                id="description"
                name="description"
                placeholder="Edit your review here"
                cols={20}
                rows={2}
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                className="w-full py-2.5 px-3 rounded-t-lg text-sm 
                        text-gray-900 bg-white focus:ring-0 
                        dark:placeholder-gray-400"
              ></textarea>
            </div>
            <div
              className="flex items-center justify-between px-3 py-2 
                            bg-gray-700 rounded-b-lg -mt-2"
            >
              <button
                type="submit"
                className="bg-gray-700 text-white px-4 text-sm 
                            hover:text-gray-200 duration-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
  return (
    <>
      <div key={id} className="relative my-2 md:pl-3 p-1.5 ">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link href={`/user/${userId}`}>
              <img
                src={image}
                alt="lel"
                className="rounded-full h-[50px] w-[50px]"
              />
            </Link>
            <p className="text-base font-medium text-gray-900 mb-0.5 ml-3">
              {name}
            </p>
          </div>
          <div className="flex items-center">
            {activeSession && (
              <img
                src="/horizontal-dots.svg"
                alt="lel"
                height={23}
                width={23}
                className="hover:bg-gray-200"
                ref={buttonRef}
                onClick={() => setDropdown(!dropdown)}
              />
            )}
          </div>
        </div>

        {dropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-2 top-11 bg-white rounded border w-32 z-[9999]"
          >
            <ul className="text-sm text-slate-700">
              <li
                onClick={showHideDropdown}
                className="hover:bg-gray-200 hover:text-black py-1.5 pl-2 flex duration-300"
              >
                <img
                  src="/pen.svg"
                  height={18}
                  width={18}
                  alt="lel"
                  className="mr-1.5"
                />{" "}
                Edit
              </li>
              <li
                onClick={deleteReviewHandler}
                className="hover:bg-gray-200 hover:text-black py-1.5 pl-2 flex duration-300"
              >
                <img
                  src="/trash.svg"
                  height={18}
                  width={18}
                  alt="lel"
                  className="mr-1.5"
                />{" "}
                Delete
              </li>
            </ul>
          </div>
        )}

        <p className="text-sm mt-3 mb-0.5 lg:pl-5 text-gray-800">
          {description}
        </p>
      </div>
    </>
  );
};

export default ReviewCard;
