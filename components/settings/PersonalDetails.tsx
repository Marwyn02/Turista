import { useSession } from "next-auth/react";
import { useState } from "react";

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
  const [newName, setNewName] = useState<string>(name);

  const [onEditState, setOnEditState] = useState<{
    name: boolean;
  }>({
    name: false,
  });

  // Handle the toggling function of the post information,
  // title, location, description
  const handleEditToggle = (inputName: string) => {
    setOnEditState((prevEditState) => ({
      ...prevEditState,
      [inputName]: !prevEditState[inputName as keyof typeof prevEditState],
    }));
  };

  const submitChangeHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/setting/edit", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({}),
      });
      console.log(newName);
    } catch (error) {}
  };
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
      <section className="my-5">
        {!onEditState.name ? (
          <section>
            <h3 className="font-bold text-gray-700">Display name</h3>
            <p className="text-sm text-gray-500 font-light">
              Remember to change your name with your real name, people might not
              recognize you easily.
            </p>
            <div className="flex justify-between bg-gray-100 rounded-md px-4 py-1 mt-3">
              <p className="font-normal text-gray-700 mt-1">{name}</p>
              <button
                type="button"
                className="border border-gray-400 rounded-full px-3 text-xs font-bold text-gray-700 bg-gray-100 hover:text-gray-900 hover:bg-gray-200 duration-300"
                onClick={() => handleEditToggle("name")}
              >
                Change
              </button>
            </div>
          </section>
        ) : (
          <section>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-700">Display name</h3>
              <button
                className="font-medium text-sm text-gray-800 hover:underline hover:text-black"
                onClick={() => {
                  handleEditToggle("name");
                  setNewName(name);
                }}
              >
                Cancel
              </button>
            </div>
            <p className="text-sm text-gray-500 font-light">
              Its important that your name is valid, so other people will
              recognize you easily.
            </p>
            <form onSubmit={submitChangeHandler} method="post">
              <div className="border px-2  py-1 rounded-lg w-fit my-3 hover:border-black duration-300">
                <label
                  htmlFor="name"
                  className="font-light text-xs text-gray-600"
                >
                  Make your new name
                </label>
                <input
                  type="text"
                  placeholder={name}
                  value={newName}
                  name="name"
                  id="name"
                  onChange={(e) => setNewName(e.target.value)}
                  className="block w-[270px] py-1 -mt-1 font-light text-black placeholder:text-gray-400
                sm:text-base sm:leading-6 focus:ring-0 focus:border-0 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-black font-normal"
              >
                Save
              </button>
            </form>
          </section>
        )}
      </section>

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
