import Link from "next/link";
import { useState } from "react";
import router from "next/router";

import AmenitiesBox from "./UI/EditAmenityBox";
import EditPostImage from "./UI/EditPostImage";
import EditMap from "./UI/EditMap";

export default function EditPost(props) {
  const { id, title, coordinate, location, image, description, amenities } =
    props;

  const [newImage, setNewImage] = useState([]);
  const [newTitle, setNewTitle] = useState(title);
  const [newCoordinates, setNewCoordinates] = useState({
    lng: coordinate.lng,
    lat: coordinate.lat,
  });
  const [newDescription, setNewDescription] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [newAmenities, setNewAmenities] = useState(amenities);

  const [loading, setLoading] = useState(false);

  const editCoordinates = ({ lng, lat }) => {
    setNewCoordinates({ lng: lng, lat: lat });
  };

  const amenitiesChecked = (amenity) => {
    setNewAmenities(amenity);
  };

  // Update the image state with the new data from the EditPostImage component
  const updateImageData = (newImageData) => {
    if (newImageData.length !== 0) {
      setNewImage(newImageData); // 1
      console.log("Updated image data");
    }
  };

  // Update the current post data
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedPost;

    // Check if the new image array is not empty
    if (newImage.length === 0) {
      updatedPost = {
        id: id,
        image: image, // old image data
        title: newTitle,
        coordinate: newCoordinates,
        location: newLocation,
        description: newDescription,
        amenities: newAmenities,
      };
    } else {
      updatedPost = {
        id: id,
        image: newImage, // updatedimage data
        title: newTitle,
        coordinate: newCoordinates,
        location: newLocation,
        description: newDescription,
        amenities: newAmenities,
      };
    }

    if (updatedPost) {
      console.log("POST: ", updatedPost);
    } else {
      console.log("No updated post");
    }

    try {
      const response = await fetch(`/api/post/edit`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      }).then((r) => r.json());

      if (!response.success) {
        setLoading(false);
        throw new Error(response.message);
      }

      console.log(response.message);
      router.push(response.redirect);
      setLoading(false);
    } catch (error) {
      console.error("Error occur in post edit, ", error);
    }
  };
  return (
    <form onSubmit={handleEditSubmit} className="bg-white sm:my-4">
      <div className="space-y-10 md:px-2">
        <div className="px-5">
          <h2 className="text-xl">Your post.</h2>
          <p className="text-xs text-gray-600 mt-2">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div>
          {/* Image Input  */}
          <div className="sm:col-span-6">
            <EditPostImage
              id={id}
              image={image}
              title={title}
              updateImageData={updateImageData}
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:grid-cols-6">
            {/* Map  */}
            <div className="sm:col-span-6 border-t pt-10">
              <h2 className="text-sm font-medium leading-6 text-gray-600">
                Map
              </h2>
              <EditMap
                checkLat={coordinate.lat}
                checkLng={coordinate.lng}
                onEditMarkerClick={editCoordinates}
              />
            </div>

            {/* Amenities Input  */}
            <div className="sm:col-span-6">
              <h2 className="text-sm font-medium leading-6 text-gray-600">
                Amenities
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <AmenitiesBox
                  editAmenities={newAmenities}
                  amenitiesChecked={amenitiesChecked}
                />
              </div>
            </div>

            {/* Title Input  */}
            <div className="sm:col-span-6">
              <label
                className="text-sm font-medium leading-6 text-gray-600"
                htmlFor="title"
              >
                Title
              </label>
              <div>
                <div className="flex w-full">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="add_edit_title"
                    placeholder="My travel post title"
                    onChange={(e) => setNewTitle(e.target.value)}
                    value={newTitle}
                    required
                  ></input>
                </div>
              </div>
            </div>

            {/* Location Input  */}
            <div className="sm:col-span-6">
              <label
                className="text-sm font-medium leading-6 text-gray-600"
                htmlFor="location"
              >
                Location
              </label>
              <div>
                <div className="flex w-full">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="add_edit_location"
                    placeholder="Where it was street, country name"
                    onChange={(e) => setNewLocation(e.target.value)}
                    value={newLocation}
                    required
                  ></input>
                </div>
              </div>
            </div>

            {/* Description Input  */}
            <div className="sm:col-span-6">
              <label
                className="text-sm font-medium leading-6 text-gray-600"
                htmlFor="description"
              >
                Description
              </label>
              <div>
                <div className="flex w-full">
                  <textarea
                    cols="30"
                    rows="5"
                    name="description"
                    id="description"
                    className="add_edit_description"
                    placeholder="Is it fun? Maybe not"
                    onChange={(e) => setNewDescription(e.target.value)}
                    value={newDescription}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Cancel and update buttons */}
            <div className="flex justify-between md:justify-normal items-center gap-x-1.5 py-3">
              <div>
                <Link href={`/${id}`}>
                  <button
                    type="button"
                    className="bg-white text-gray-900 border 
                        border-gray-700 text-sm px-5 py-1.5 w-full rounded hover:bg-gray-800 
                        hover:text-white duration-200"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-violet-400 text-white text-sm px-5 py-1.5 w-full border 
                      border-transparent rounded hover:bg-violet-500 duration-200"
                  disabled={loading}
                >
                  {!loading ? "Save" : "Saving..."}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
