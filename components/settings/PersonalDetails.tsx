import { useSession } from "next-auth/react";
import { useState } from "react";
import router from "next/router";

import PersonalImage from "./Components/PersonalImage";
import { DeleteButton } from "../UI/Buttons/Button";
import { DeleteModal, LoadingModal } from "../UI/Modals/Modal";

type TPersonalDetailsProps = {
  name: string;
  email: string;
  image?: string;
  cover_photo: {
    image: string;
    public_id: string;
  };
};

export default function PersonalDetails({
  name,
  email,
  image,
  cover_photo,
}: TPersonalDetailsProps) {
  const { data: session } = useSession();
  const [newName, setNewName] = useState<string>(name);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [onEditState, setOnEditState] = useState<{
    name: boolean;
    image: boolean;
    cover_photo: boolean;
  }>({
    name: false,
    image: false,
    cover_photo: false,
  });

  // Image loading
  const handleImageLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  // Handle the toggling function of the post information,
  // title, location, description
  const handleEditToggle = (inputName: string) => {
    setOnEditState((prevEditState) => ({
      ...prevEditState,
      [inputName]: !prevEditState[inputName as keyof typeof prevEditState],
    }));
  };

  // Update Users Name
  const submitNameChangeHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setMessage("Please wait for a moment.");

      const response = await fetch("/api/setting/edit", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          userId: (session?.user as { _id: string })?._id as string,
        }),
      }).then((r) => r.json());

      if (response.success) {
        setMessage(response.message);
        setTimeout(() => {
          router.push(response.path);
          setIsLoading(false);
        }, 3000);
      }
    } catch (error: any) {
      console.error("Failed to update a your profile, ", error);
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-10 px-3 lg:px-0">
      {isLoading && <LoadingModal message={message} />}
      <h4 className="text-sm text-gray-700 pb-1 font-semibold border-b">
        Account Preferences
      </h4>

      {/* Email address  */}
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
      <section>
        <h4 className="text-sm text-gray-700 pb-1 font-semibold border-b mt-16">
          Profile Information
        </h4>

        {/* Name  */}
        <section className="my-5">
          {!onEditState.name ? (
            <section>
              <h3 className="font-bold text-gray-700">Display name</h3>
              <p className="text-sm text-gray-500 font-light">
                Remember to change your name with your real name, people might
                not recognize you easily.
              </p>
              <div className="flex justify-between bg-gray-100 rounded-md px-2 py-1 mt-3">
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
              <form onSubmit={submitNameChangeHandler} method="post">
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
        <section>
          <h4 className="text-sm text-gray-700 pb-1 font-semibold border-b mt-16 mb-5">
            Images
          </h4>

          {/* Profile Image preview and input  */}
          <section>
            <div>
              <div className="flex justify-between py-1">
                <p className="font-bold text-gray-700">Profile Image</p>
                {/* Change and cancel buttons */}
                {!onEditState.image ? (
                  <button
                    type="button"
                    className="border border-gray-400 rounded-full px-3 py-1 text-xs font-bold text-gray-700 bg-white hover:text-gray-900 hover:bg-gray-200 duration-300"
                    onClick={() => handleEditToggle("image")}
                  >
                    Change
                  </button>
                ) : (
                  <button
                    type="button"
                    className="font-medium text-sm text-gray-800 hover:underline hover:text-black"
                    onClick={() => handleEditToggle("image")}
                  >
                    Cancel
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 font-normal -mt-1.5">
                Display image must be in .png or .jpeg format
              </p>
            </div>
            {!onEditState.image ? (
              <img
                src={image}
                alt="Profile Image"
                className="h-[100px] w-[100px] rounded-md mt-3.5"
              />
            ) : (
              // Image change handler
              <PersonalImage
                imageType={"profile_image"}
                onMessage={(newMessage) => setMessage(newMessage)}
                onLoading={handleImageLoading}
              />
            )}
          </section>

          {/* Cover Photo preview and input  */}
          <section className="mt-10">
            <div>
              <div className="flex justify-between py-1">
                <p className="font-bold text-gray-700">Cover photo</p>
                {/* Cover photo change and cancel button  */}
                {!onEditState.cover_photo ? (
                  <button
                    type="button"
                    onClick={() => handleEditToggle("cover_photo")}
                    className="border border-gray-400 rounded-full px-3 py-1 text-xs font-bold text-gray-700 bg-white hover:text-gray-900 hover:bg-gray-200 duration-300"
                  >
                    Change
                  </button>
                ) : (
                  <button
                    type="button"
                    className="font-medium text-sm text-gray-800 hover:underline hover:text-black"
                    onClick={() => handleEditToggle("cover_photo")}
                  >
                    Cancel
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 font-normal -mt-1.5">
                Display image must be in .png or .jpeg format
              </p>
            </div>
            {!onEditState.cover_photo ? (
              <div>
                {/* Default cover photo will display if not changed */}
                {cover_photo.image === "" ? (
                  <div className="bg-gradient-to-t from-pink-400 from-25% to-violet-600 w-[600px] h-[300px] md:rounded-lg object-cover z-10 opacity-70 mt-3.5"></div>
                ) : (
                  <img
                    src={cover_photo.image}
                    alt="Cover Photo"
                    className="animated-slide h-[400px] rounded-lg mt-3.5"
                  />
                )}
              </div>
            ) : (
              // Image change handler
              <PersonalImage
                imageType={"cover_photo"}
                onMessage={(newMessage) => setMessage(newMessage)}
                onLoading={handleImageLoading}
              />
            )}
          </section>
        </section>

        {/* Delete Account  */}
        <section className="mt-16">
          <h4 className="text-sm text-gray-700 pb-1 font-semibold border-b">
            Delete Account
          </h4>
          <div className="flex justify-between items-center my-8">
            {/* This is just a block */}
            <div></div>
            {/* Delete button for the modal  */}
            <DeleteButton onClick={() => setIsOpen(!isOpen)}>
              <span className="text-white font-semibold text-xs">
                DELETE ACCOUNT
              </span>
            </DeleteButton>

            {/* Delete Modal  */}
            <DeleteModal
              message={
                "Deleting your account will delete all your posts and review all through the platform."
              }
              userId={(session?.user as { _id: string })?._id as string}
              isOpen={isOpen}
              deleteType="account"
              onClose={() => setIsOpen(false)}
              onLoading={() => setIsLoading(!isLoading)}
            />
          </div>
        </section>
      </section>
    </section>
  );
}
