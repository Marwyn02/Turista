import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";

import AmenitiesBox from "../ui/AmenitiesBox";

export default function AddPost() {
  const { data: session } = useSession();
  const router = useRouter();

  const [imageData, setImageData] = useState([]);

  const amenitiesRef = useRef([]);
  const coordinatesRef = useRef({ lng: 0, lat: 0 });
  const descriptionInputRef = useRef();
  const locationInputRef = useRef();
  const titleInputRef = useRef();

  const [imageOnePreview, setImageOnePreview] = useState(null);
  const [imageTwoPreview, setImageTwoPreview] = useState(null);
  const [imageThreePreview, setImageThreePreview] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const imageOneInputRef = useRef();
  const imageTwoInputRef = useRef();
  const imageThreeInputRef = useRef();

  const [showContinue, setShowContinue] = useState(false);
  const [loading, setLoading] = useState(false);

  const coordinates = ({ lat, lng }) => {
    coordinatesRef.current = { lng, lat };
  };

  const Map = dynamic(() => import("@/pages/map/Map"), {
    loading: () => "Loading...",
    ssr: false,
  });

  const amenitiesChecked = (amenity) => {
    amenitiesRef.current = amenity;
  };

  // Image handler
  const handleImageChange = async (e, setImagePreview) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImages((prevImages) => [...prevImages, imageFile]);
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(imageFile);
    }
  };

  // Image submit to cloudinary handler
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newImageDataArray = [];

    for (const images of selectedImages) {
      const form = new FormData();
      form.append("file", images);
      form.append("upload_preset", "Turista-Uploads");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgzsmdvo4/image/upload",
        {
          method: "POST",
          body: form,
        }
      ).then((r) => r.json());

      console.log("Response: ", response);

      const newImageData = {
        image: response.secure_url,
        public_id: response.public_id,
      };
      newImageDataArray.push(newImageData);
    }
    setImageData(newImageDataArray);
    setShowContinue(true);
    setLoading(false);
  };

  // Submit the input
  const submitInputHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const enteredTitle = titleInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const selectedCheckbox = amenitiesRef.current.map((check) => ({
      name: check.name,
      description: check.description,
      checked: check.checked,
    }));
    const img = imageData.map((i) => ({
      image: i.image,
      public_id: i.public_id,
    }));

    const postData = {
      image: img,
      title: enteredTitle.charAt(0).toUpperCase() + enteredTitle.slice(1),
      location: enteredLocation,
      coordinate: {
        lng: coordinatesRef.current.lng,
        lat: coordinatesRef.current.lat,
      },
      amenities: selectedCheckbox,
      description: enteredDescription,
      user: session.user._id,
    };

    try {
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const res = await response.json();
        console.log(res.message);
        router.push(res.redirect);
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error(res.message);
      }
    } catch (error) {
      throw new Error("Error in Create Post Submit Handler: ", error);
    }
  };
  return (
    <form className="bg-white sm:my-4" onSubmit={submitInputHandler}>
      <div className="space-y-10 md:px-2">
        <div className="px-5">
          <h2 className="text-xl">Create your own post.</h2>
          <p className="text-xs text-gray-600 mt-2">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 px-5 sm:grid-cols-6">
          {/* Map Input  */}
          <div className="sm:col-span-6">
            <Map onMarkerClick={coordinates} />
          </div>

          {/* Location Input  */}
          <div className="sm:col-span-6 mb-3">
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
                  autoComplete="location"
                  className="flex-1 border rounded-lg shadow-sm py-2.5 px-3 pl-3 
                           text-gray-600 placeholder:text-gray-300
                             sm:text-sm sm:leading-6 focus:ring-1 focus:ring-indigo-600
                           focus:border-indigo-600 focus:outline-none"
                  placeholder="Where it was street, country name"
                  ref={locationInputRef}
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities Input  */}
          <div className="sm:col-span-6 border-t pt-10">
            <h2 className="text-sm font-medium leading-6 text-gray-600">
              Amenities
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <AmenitiesBox amenitiesChecked={amenitiesChecked} />
            </div>
          </div>

          {/* Image Input  */}
          <div className="sm:col-span-6 py-10 border-y">
            <label className="text-sm font-medium leading-6 text-gray-600">
              Image
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Choose three (3) images/files to save
            </p>

            {!imageOnePreview && (
              <div
                className="mt-2 flex justify-center rounded-lg border 
                            border-dashed border-gray-900/25 px-6 py-10"
              >
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload-1"
                      className="relative cursor-pointer rounded-md bg-white 
                               font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-1"
                        name="file-upload-1"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) =>
                          handleImageChange(e, setImageOnePreview)
                        }
                        ref={imageOneInputRef}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}

            {imageOnePreview && (
              <img
                src={imageOnePreview}
                alt="Preview 1"
                className="mt-4 rounded-lg"
              />
            )}

            {/* Secondary images  */}
            <div
              className={`grid ${
                !imageTwoPreview ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {!imageTwoPreview && imageOnePreview && (
                <div
                  className="mt-2 flex justify-center rounded-lg border border-dashed 
                            border-gray-900/25 px-6 py-10"
                >
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload-2"
                        className="relative cursor-pointer rounded-md bg-white 
                                 font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload-2"
                          name="file-upload-2"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) =>
                            handleImageChange(e, setImageTwoPreview)
                          }
                          ref={imageTwoInputRef}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}

              {imageTwoPreview && (
                <img
                  src={imageTwoPreview}
                  alt="Preview 2"
                  className="mt-4 rounded-lg"
                />
              )}

              {/* If there's no image two preview then show the input file */}
              {!imageThreePreview && imageTwoPreview && (
                <div
                  className="mt-2 flex justify-center rounded-lg border border-dashed
                            border-gray-900/25 px-6 py-10"
                >
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload-3"
                        className="relative cursor-pointer rounded-md bg-white 
                                 font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload-3"
                          name="file-upload-3"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) =>
                            handleImageChange(e, setImageThreePreview)
                          }
                          ref={imageThreeInputRef}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}

              {imageThreePreview && (
                <img
                  src={imageThreePreview}
                  alt="Preview 3"
                  className="mt-4 rounded-lg"
                />
              )}
            </div>

            {/* Will clear all preview images and the array state for the cloudinary */}
            {imageOnePreview && !showContinue && (
              <button
                onClick={(e) => {
                  setSelectedImages([]);
                  setImageOnePreview(null);
                  setImageTwoPreview(null);
                  setImageThreePreview(null);
                  e.preventDefault();
                }}
                className="bg-gray-100 text-xs border rounded-full px-1.5 py-0.5 
                             duration-300 text-gray-700"
                disabled={loading}
              >
                Clear image(s)
              </button>
            )}

            {/* Will save the image to the cloudinary */}
            {selectedImages && selectedImages.length === 3 && (
              <button
                onClick={handleImageSubmit}
                className="text-sm bg-indigo-200 text-gray-900 px-5 py-1.5 rounded-lg my-2 duration-300"
                disabled={showContinue || loading}
              >
                {loading ? (
                  "Saving..."
                ) : showContinue ? (
                  <div className="flex items-center">
                    Saved{" "}
                    <img
                      src="/check-photo.svg"
                      alt="saved"
                      height={20}
                      width={20}
                      className="ml-1"
                    />
                  </div>
                ) : (
                  "Save selected images"
                )}
              </button>
            )}
          </div>

          {/* Title Input  */}
          {showContinue && (
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
                    autoComplete="title"
                    className="flex-1 border rounded-lg shadow-sm py-2.5 px-3 pl-3 
                          text-gray-600 placeholder:text-gray-300
                            sm:text-sm sm:leading-6 focus:ring-1 focus:ring-indigo-600
                          focus:border-indigo-600 focus:outline-none"
                    placeholder="My travel post title"
                    ref={titleInputRef}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Description Input  */}
          {showContinue && (
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
                    type="text"
                    name="description"
                    id="description"
                    className="resize-none flex-1 border rounded-lg shadow-sm py-2.5 px-3 pl-3 text-gray-600 
                          placeholder:text-gray-300 sm:text-sm sm:leading-6 focus:ring-1 
                          focus:ring-indigo-600 focus:border-indigo-600 focus:outline-none"
                    placeholder="Is it fun? Maybe not..."
                    ref={descriptionInputRef}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Submit and cancel buttons */}
          <div className="flex gap-x-1.5 pt-5">
            <div>
              <Link href="/">
                <button
                  type="button"
                  className="bg-gray-200 text-sm py-1 px-1.5 w-max rounded text-gray-900"
                  disabled={loading}
                >
                  Cancel
                </button>
              </Link>
            </div>
            {showContinue && (
              <div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-sm py-1 px-1.5 w-max rounded text-gray-100"
                  disabled={loading}
                >
                  {!loading ? "Create a new post" : "Creating your post"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
