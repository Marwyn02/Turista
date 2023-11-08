import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import router from "next/router";
import { useSession } from "next-auth/react";

import AmenitiesBox from "../ui/AmenitiesBox";

// type TImage = {
//   image: string;
//   public_id: string;
// };

type TAmenities = {
  name: string;
  description: string;
  checked: boolean;
};

export default function AddPost() {
  const { data: session } = useSession();

  // This is the firewall for the not authenticated clients
  useEffect(() => {
    if (!session) {
      router.push("/account/login");
      return;
    }
  }, [session]);

  // Form data
  const titleInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  // const [imageData, setImageData] = useState<TImage[]>([]);
  const amenitiesRef = useRef<TAmenities[]>([]);
  const coordinatesRef = useRef<{ lng: number; lat: number }>({
    lng: 0,
    lat: 0,
  });

  // Image data
  const [imageOnePreview, setImageOnePreview] = useState<string | null>(null);
  const [imageTwoPreview, setImageTwoPreview] = useState<string | null>(null);
  const [imageThreePreview, setImageThreePreview] = useState<string | null>(
    null
  );

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const imageOneInputRef = useRef<HTMLInputElement>(null);
  const imageTwoInputRef = useRef<HTMLInputElement>(null);
  const imageThreeInputRef = useRef<HTMLInputElement>(null);

  // Loading states
  const [showContinue, setShowContinue] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get coordinates
  const coordinates = ({ lat, lng }: { lat: number; lng: number }) => {
    coordinatesRef.current = { lng, lat };
  };

  // Get amenities
  const amenitiesChecked = (amenity: TAmenities[]) => {
    amenitiesRef.current = amenity;
  };

  // Image handler
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
  ): Promise<void> => {
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      const reader: FileReader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        setSelectedImages((prevImages: File[]) => [...prevImages, imageFile]);
        setImagePreview(e.target?.result as string);
      };

      reader.readAsDataURL(imageFile);
    }
  };

  // Image submit to cloudinary handler
  // const handleImageSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const newImageDataArray = [];

  //   for (const images of selectedImages) {
  //     const form = new FormData();
  //     form.append("file", images);
  //     form.append("upload_preset", "Turista-Uploads");

  //     const response = await fetch(
  //       process.env.NEXT_PUBLIC_CLOUDINARY_URL as string,
  //       {
  //         method: "POST",
  //         body: form,
  //       }
  //     ).then((r) => r.json());

  //     console.log("Response: ", response);

  //     const newImageData = {
  //       image: response.secure_url,
  //       public_id: response.public_id,
  //     };
  //     newImageDataArray.push(newImageData);
  //   }
  //   setImageData(newImageDataArray);
  //   setShowContinue(true);
  //   setLoading(false);
  // };

  console.log("Selected Images: ", selectedImages);

  // Check the selectedImages if the length is less than 3,
  // to hide the title and description input.
  // And the save button.
  useEffect(() => {
    if (selectedImages.length < 3) {
      setShowContinue(false);
    } else {
      setShowContinue(true);
    }
  }, [selectedImages]);

  // Submit the inputs of the user to the database
  const submitHandler = async () => {
    setLoading(true);

    try {
      // Upload images to cloudinary
      const newImageDataArray = [];

      // Loop all the selectedImages
      for (const images of selectedImages) {
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

        // Create a variable for the image and public_id of the image,
        // to store in the array of newImageDataArray
        const newImageData = {
          image: response.secure_url,
          public_id: response.public_id,
        };
        // Push the newImageData to the new array to later store in the postData object
        newImageDataArray.push(newImageData);
      }

      // setImageData(newImageDataArray);
      // setShowContinue(true);
      // setLoading(false);

      const postData = {
        loves: [], // insert no element array
        image: newImageDataArray.map((i) => ({
          image: i.image,
          public_id: i.public_id,
        })),
        title:
          titleInputRef.current!.value.charAt(0).toUpperCase() +
          titleInputRef.current!.value.slice(1),
        location: locationInputRef.current?.value,
        coordinate: {
          lng: coordinatesRef.current.lng,
          lat: coordinatesRef.current.lat,
        },
        amenities: amenitiesRef.current.map((check) => ({
          name: check.name,
          description: check.description,
          checked: check.checked,
        })),
        description: descriptionInputRef.current?.value,
        user: (session?.user as { _id: string })?._id as string,
      };

      console.log("Response: ", postData);

      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postData),
      }).then((r) => r.json());

      if (!response.success) {
        setLoading(false);
        console.error(response.message);
      }

      console.log(response.message);
      router.push(response.redirect);
      location.reload();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Failed to create a post, ", error);
    }
  };

  // Map import
  const AddMap = dynamic(() => import("./UI/AddMap"), {
    loading: () => <p>Loading Map...</p>,
    ssr: false,
  });
  return (
    <section className="bg-white sm:my-4">
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
            <AddMap onMarkerClick={coordinates} />
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
                  className="add_edit_location"
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
              Choose three (3) images to save
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
                className="mt-2 md:mt-4 rounded-lg"
              />
            )}

            {/* Secondary images  */}
            <div
              className={`grid ${
                !imageTwoPreview
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 md:gap-x-2"
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
                  className="mt-2 md:mt-4 rounded-lg"
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
                  className="mt-2 md:mt-4 rounded-lg"
                />
              )}
            </div>

            {/* Images Buttons  */}
            <div className="flex gap-x-2 md:mt-2">
              {/* Will clear all preview images and the array state for the cloudinary */}
              {imageOnePreview && !loading && (
                <button
                  onClick={(e) => {
                    setSelectedImages([]);
                    setImageOnePreview(null);
                    setImageTwoPreview(null);
                    setImageThreePreview(null);
                    e.preventDefault();
                  }}
                  className="px-4 py-2 text-xs md:text-sm bg-gray-200 text-gray-500 duration-300 
                          rounded mt-2 hover:bg-gray-300 hover:text-gray-600"
                  disabled={loading}
                >
                  Clear image(s)
                </button>
              )}

              {/* Will save the image to the cloudinary */}
              {/* {selectedImages && selectedImages.length === 3 && (
                <button
                  onClick={handleImageSubmit}
                  className={`px-8 py-2 text-xs md:text-sm  duration-300 
                  rounded mt-2  ${
                    showContinue
                      ? "bg-gray-300"
                      : "bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white"
                  }`}
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
              )} */}
            </div>
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
                    className="add_edit_title"
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
                    cols={30}
                    rows={5}
                    name="description"
                    id="description"
                    className="add_edit_description"
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
                  className="bg-gray-200 text-sm py-1.5 px-4 w-max rounded text-gray-900
                  hover:bg-gray-300 duration-300"
                  disabled={loading}
                >
                  Cancel
                </button>
              </Link>
            </div>
            {showContinue && (
              <div>
                <button
                  type="button"
                  className="bg-indigo-500 text-sm py-1.5 px-4 w-max rounded text-gray-100"
                  onClick={submitHandler}
                  disabled={loading}
                >
                  {!loading ? "Create a post" : "Creating your post..."}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
