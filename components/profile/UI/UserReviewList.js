import Link from "next/link";

const UserReviewList = ({ reviews }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-y-1 lg:gap-y-4 pb-5 md:pb-10 pt-3 lg:pt-6 mt-5">
        {reviews.map((review) => (
          <div key={review.id} className="relative my-2 md:pl-3 p-1.5 ">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Link href={`/user/${review.user}`}>
                  <img
                    src={review.image}
                    alt="lel"
                    className="rounded-full h-[50px] w-[50px]"
                  />
                </Link>
                <p className="text-base font-medium text-gray-900 mb-0.5 ml-3">
                  {review.username}
                </p>
              </div>
            </div>

            <p className="text-sm mt-3 mb-0.5 lg:pl-5 text-gray-800">
              {review.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserReviewList;
