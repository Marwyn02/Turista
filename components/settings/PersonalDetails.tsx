import { useSession } from "next-auth/react";

export default function PersonalDetails({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {
  const { data: session } = useSession();
  return (
    <section className="mt-10 px-3 lg:px-0">
      <h4 className="text-sm text-gray-700 pb-1 font-semibold border-b">
        Account Preferences
      </h4>

      <div className="mb-10">
        {/* Email  */}
        <div className="font-bold text-gray-700 my-5">
          Email Address
          <p className="font-normal bg-gray-100 rounded-md pl-2 py-1 text-gray-700 mt-1">
            {email}
          </p>
        </div>
      </div>

      {/* Profile Information  */}
      <h4 className="text-sm text-gray-700 pb-1 font-semibold border-b mt-16">
        Profile Information
      </h4>

      {/* Name  */}
      <div className="font-bold text-gray-700 my-5">
        Display name
        <p className="font-normal bg-gray-100 rounded-md pl-2 py-1 text-gray-700 mt-1">
          {name}
        </p>
      </div>

      {/* Image  */}
      <h4 className="text-sm text-gray-700 pb-1 font-semibold border-b mt-16">
        Images
      </h4>
      {/* Image  */}
      <div className="font-bold text-gray-700 my-5">
        Profile Image
        <p className="text-xs text-gray-500 font-normal mt-0.5">
          Display image must be in .png or .jpeg format
        </p>
        <img
          src={image}
          height={50}
          width={50}
          alt="Profile Image"
          className="h-[100px] w-[100px] rounded-md font-normal mt-3.5"
        />
      </div>

      {/* Delete Account  */}
      <h4 className="text-sm text-gray-700 pb-1 font-semibold border-b mt-16">
        Delete Account
      </h4>
      <div className="flex justify-between items-center my-8">
        <div></div>
        <button className="text-xs font-bold text-red-500" disabled>
          DELETE ACCOUNT{" "}
          <p className="text-xs text-gray-500 font-normal bg-gray-100 py-1 px-3 rounded-md mt-2">
            Still in progress...
          </p>
        </button>
      </div>
    </section>
  );
}
