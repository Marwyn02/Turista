import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const EditPost = (props) => {
  const router = useRouter();
  const { id, title, location, image, description, amenities } = props;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [newAmenities, setNewAmenities] = useState(amenities);

  const handleCheckboxChange = (event, index) => {
    const updatedAmenities = [...newAmenities];
    updatedAmenities[index].checked = event.target.checked;
    setNewAmenities(updatedAmenities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      id: id,
      title: newTitle,
      location: newLocation,
      description: newDescription,
      amenities: newAmenities,
    };
    try {
      const response = await fetch(`/api/post/edit`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      } else {
        router.push(`/${id}`);
      }
    } catch (error) {
      throw new Error("Error in Edit Post: " + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white sm:my-4 py-10 md:rounded-lg md:border-2 md:border-blue-200"
    >
      <div className="space-y-12 px-5">
        <h2 className="text-4xl font-semibold leading-7 text-blue-400 underline">
          Edit your post
        </h2>
        <p className="text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 md:gap-y-8 sm:grid-cols-6">
          {/* Title Input  */}
          <div className="sm:col-span-4">
            <label
              className="text-sm font-medium leading-6 text-gray-600"
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
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-600 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="My travel post title"
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle}
                  required
                ></input>
              </div>
            </div>
          </div>

          {/* Location Input  */}
          <div className="sm:col-span-4">
            <label
              className="text-sm font-medium leading-6 text-gray-600"
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
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-600 placeholder:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Where it was street, country name"
                  onChange={(e) => setNewLocation(e.target.value)}
                  value={newLocation}
                  required
                ></input>
              </div>
            </div>
          </div>

          {/* Image Input  */}
          <div className="sm:col-span-4">
            <label
              htmlFor="image"
              className="text-sm font-medium leading-6 text-gray-600"
            >
              Image
            </label>
            <img
              src={image}
              alt={title}
              name="image"
              id="image"
              className="h-20"
            />
          </div>

          {/* Amenities Input  */}
          <div className="sm:col-span-4 border border-gray-300 p-4 rounded-lg">
            {newAmenities.map((amenity, index) => (
              <div className="relative flex gap-x-3" key={amenity.name}>
                <div className="flex h-6 items-center">
                  <input
                    id={amenity.name}
                    name={amenity.name}
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, index)}
                    checked={amenity.checked}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor={amenity.name}
                    className="font-medium text-indigo-400"
                  >
                    {amenity.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Description Input  */}
          <div className="sm:col-span-full">
            <label
              className="text-sm font-medium leading-6 text-gray-600"
              htmlFor="description"
            >
              Description
            </label>
            <div>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                <textarea
                  cols="30"
                  rows="5"
                  name="description"
                  id="description"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Is it fun? Maybe not"
                  onChange={(e) => setNewDescription(e.target.value)}
                  value={newDescription}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex gap-x-1.5">
            <div>
              <Link href={`/${id}`}>
                <button className="bg-gray-200 text-sm py-1 px-5 w-max rounded text-gray-900">
                  Cancel
                </button>
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="bg-indigo-500 text-sm py-1 px-5 w-max rounded text-gray-100"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditPost;
