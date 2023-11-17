import React, { FC, useState } from "react";
import Link from "next/link";
import router from "next/router";

import AmenitiesBox from "./UI/AmenityBox";
import EditPostImage from "./UI/EditPostImage";
import FormMap from "./UI/FormMap";

type TImages = {
  image: string;
  public_id: string;
};

type TCoordinates = {
  lat: number;
  lng: number;
};

type TAmenities = {
  name: string;
  description: string;
  checked: boolean;
};

type TEditPostDataProps = {
  id: string;
  title: string;
  coordinate: TCoordinates;
  location: string;
  image: TImages[];
  description: string;
  amenities: TAmenities[];
};

const EditPost: FC<TEditPostDataProps> = (props) => {
  const { id, title, coordinate, location, image, description, amenities } =
    props;

  const [newImage, setNewImage] = useState<File[]>([]);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newCoordinates, setNewCoordinates] = useState<TCoordinates>({
    lng: coordinate.lng,
    lat: coordinate.lat,
  });
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newLocation, setNewLocation] = useState<string>(location);
  const [newAmenities, setNewAmenities] = useState<TAmenities[]>(amenities);

  // Loading States
  const [loading, setLoading] = useState<boolean>(false);

  // Post information edit states
  const [editState, setEditState] = useState<{
    title: boolean;
    location: boolean;
    description: boolean;
  }>({
    title: false,
    location: false,
    description: false,
  });

  // Handle the toggling function of the post information,
  // title, location, description
  const handleEditToggle = (inputName: string) => {
    setEditState((prevEditState) => ({
      ...prevEditState,
      [inputName]: !prevEditState[inputName as keyof typeof prevEditState],
    }));
  };

  // Fetched map coordinates from the editMap
  const editCoordinates = ({ lng, lat }: { lng: number; lat: number }) => {
    setNewCoordinates({ lng: lng, lat: lat });
  };

  const amenitiesChecked = (amenity: TAmenities[]) => {
    setNewAmenities(amenity);
  };

  // Update the image state with the new data from the EditPostImage component
  const updateImageData = (newImageData: File[]) => {
    if (newImageData.length !== 0) {
      setNewImage(newImageData);
    }
  };

  // Update the current post data
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const imageArray = [];

    for (const images of newImage) {
      const form = new FormData();
      form.append("file", images);
      form.append("upload_preset", "Turista-Uploads");

      const response = await fetch(
        process.env.NEXT_PUBLIC_CLOUDINARY_URL as string,
        {
          method: "POST",
          body: form,
        }
      ).then((r) => r.json());

      console.log("Response: ", response);

      const image = {
        image: response.secure_url,
        public_id: response.public_id,
      };

      imageArray.push(image);
    }

    let updatedPost;

    // Check if the new image array is not empty
    // If empty, this will use the prev image data so it will not update the image
    // to an empty array of image
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
      // If not empty, then this will run
      updatedPost = {
        id: id,
        image: [
          ...image.map((img) => ({
            image: img.image,
            public_id: img.public_id,
          })),
          ...imageArray,
        ],
        title: newTitle,
        coordinate: newCoordinates,
        location: newLocation,
        description: newDescription,
        amenities: newAmenities,
      };
    }

    console.log("POST: ", updatedPost);

    try {
      // const response = await fetch(`/api/post/edit`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(updatedPost),
      // }).then((r) => r.json());

      // if (!response.success) {
      //   setLoading(false);
      //   console.error(response.message);
      // }

      // console.log(response.message);
      // router.push(response.redirect);
      setLoading(false);
    } catch (error: any) {
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

        <section>
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
              <FormMap
                checkLat={coordinate.lat}
                checkLng={coordinate.lng}
                onMarkerClick={editCoordinates}
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

            {/* Post Details / Informations */}
            <section className="sm:col-span-6 pb-8">
              <h3 className="text-xl py-5">Post Information.</h3>
              <p></p>
              {/* Title Input  */}
              <div className="grid grid-cols-4 border-t border-gray-300 py-6">
                <label
                  className="col-span-1 text-sm font-medium leading-6 text-gray-700"
                  htmlFor="title"
                >
                  Title
                </label>
                <div className="col-span-2">
                  {!editState.title ? (
                    <p className="text-sm text-gray-500">{newTitle}</p>
                  ) : (
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="border border-gray-300 rounded-md p-1.5 text-black w-full text-sm 
                        focus:ring-0 focus:outline-none"
                        placeholder="My travel post title"
                        onChange={(e) => setNewTitle(e.target.value)}
                        value={newTitle}
                        required
                      />
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    className="text-xs md:text-sm text-gray-500"
                    onClick={() => handleEditToggle("title")}
                  >
                    {!editState.title ? "Edit" : "Save"}
                  </button>
                </div>
              </div>

              {/* Location Input  */}
              <div className="grid grid-cols-4 border-t py-6">
                <label
                  className="col-span-1 text-sm font-medium leading-6 text-gray-700"
                  htmlFor="location"
                >
                  Location
                </label>
                <div className="col-span-2">
                  {!editState.location ? (
                    <p className="text-sm text-gray-500">{newLocation}</p>
                  ) : (
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="location"
                        id="location"
                        className="border border-gray-300 rounded-md p-1.5 text-black w-full text-sm 
                      focus:ring-0 focus:outline-none"
                        placeholder="Where it was street, country name"
                        onChange={(e) => setNewLocation(e.target.value)}
                        value={newLocation}
                        required
                      ></input>
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    className="text-xs md:text-sm text-gray-500"
                    onClick={() => handleEditToggle("location")}
                  >
                    {!editState.location ? "Edit" : "Save"}
                  </button>
                </div>
              </div>

              {/* Description Input  */}
              <div className="grid grid-cols-4 border-t py-6">
                <label
                  className="col-span-1 text-sm font-medium leading-6 text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <div className="col-span-2">
                  {!editState.description ? (
                    <p className="text-sm text-gray-500">{newDescription}</p>
                  ) : (
                    <div className="flex w-full">
                      <textarea
                        cols={30}
                        rows={5}
                        name="description"
                        id="description"
                        className="add_edit_description"
                        placeholder="Is it fun? Maybe not"
                        onChange={(e) => setNewDescription(e.target.value)}
                        value={newDescription}
                      ></textarea>
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex justify-end items-start">
                  <button
                    type="button"
                    className="text-xs md:text-sm text-gray-500"
                    onClick={() => handleEditToggle("description")}
                  >
                    {!editState.description ? "Edit" : "Save"}
                  </button>
                </div>
              </div>
            </section>

            {/* Cancel and update buttons */}
            <section className="flex justify-between md:justify-normal items-center gap-x-1.5 py-3">
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
            </section>
          </div>
        </section>
      </div>
    </form>
  );
};

export default EditPost;
