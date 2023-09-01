import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

const NewPostsForm = () => {
  const router = useRouter();
  const titleInputRef = useRef();
  const locationInputRef = useRef();
  const descriptionInputRef = useRef();
  const checkboxRef = useRef([]);
  const imageInputRef = useRef();

  const handleCheckboxChange = (event, index) => {
    checkboxRef.current[index] = {
      name: event.target.name,
      checked: event.target.checked,
    };
  };

  const submitInputHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const checkboxData = checkboxRef.current.filter(
      (checkbox) => checkbox.checked
    );

    const postData = {
      type: "POSTS",
      title: enteredTitle,
      location: enteredLocation,
      image: enteredImage,
      description: enteredDescription,
      amenities: checkboxData,
    };

    try {
      const response = await fetch("/api/dbConnection", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      } else {
        router.push("/");
      }
    } catch (error) {
      throw new Error("Error in create post: ", error);
    }
  };

  return (
    <form onSubmit={submitInputHandler}>
      <div className="space-y-12 px-5 my-6 sm:my-10 border-l-2 border-white/70">
        <h2 className="text-4xl font-semibold leading-7 text-blue-200">
          Make a post
        </h2>
        <p className="text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Title Input  */}
          <div className="sm:col-span-4">
            <label
              className="text-sm font-medium leading-6 text-gray-100"
              htmlFor="title"
            >
              Title
            </label>
            <div>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-200 placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="My travel post title"
                  ref={titleInputRef}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Input  */}
          <div className="sm:col-span-4">
            <label
              className="text-sm font-medium leading-6 text-gray-100"
              htmlFor="location"
            >
              Location
            </label>
            <div>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                <input
                  type="text"
                  name="location"
                  id="location"
                  autoComplete="location"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-200 placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Where it was street, country name"
                  ref={locationInputRef}
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Input  */}
          <div className="sm:col-span-3">
            <label
              className="text-sm font-medium leading-6 text-gray-100"
              htmlFor="image"
            >
              Image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-100/25 px-6 py-10">
              <div className="text-center mb-4">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus:ring-0"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      ref={imageInputRef}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Amenities Input  */}
          <div className="sm:col-span-4">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="freeWifiCheckbox"
                  name="freeWifiCheckbox"
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, 0)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="comments"
                  className="font-medium text-indigo-400"
                >
                  Free wifi
                </label>
                <p className="text-gray-500">Who doesn't want a free wifi?</p>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="parkingCheckbox"
                  name="parkingCheckbox"
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, 1)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="comments"
                  className="font-medium text-indigo-400"
                >
                  Parking
                </label>
                <p className="text-gray-500">No more road side parking. Yay!</p>
              </div>
            </div>
          </div>

          {/* Description Input  */}
          <div className="sm:col-span-full">
            <label
              className="text-sm font-medium leading-6 text-gray-100"
              htmlFor="description"
            >
              Description
            </label>
            <div>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                <textarea
                  cols="30"
                  rows="5"
                  type="text"
                  name="description"
                  id="description"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-200 placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Is it fun? Maybe not"
                  ref={descriptionInputRef}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex gap-x-1.5">
            <div>
              <button className="bg-gray-200 text-sm py-1 px-1.5 w-max rounded text-gray-900">
                <Link href="/">Cancel</Link>
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="bg-indigo-500 text-sm py-1 px-1.5 w-max rounded text-gray-100"
              >
                Create a post
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewPostsForm;
