import React, { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";

import AmenityBox from "./UI/AmenityBox";
import FormMap from "./UI/FormMap";

import LoadingPostModal from "../UI/LoadingPostModal";

type TAmenities = {
  name: string;
  description: string;
  checked: boolean;
};

export default function AddPost() {
  const { data: session, status: loading } = useSession();
  const [message, setMessage] = useState<string>("");

  // This is the firewall for the not authenticated clients
  useEffect(() => {
    if (loading === "loading") {
      return;
    }

    if (!session) {
      setIsLoading(true);
      setMessage(
        "You are not authenticated to enter this page! Go to login page."
      );

      // Timed the return to login page if not authenticated,
      // to make it more interactive
      setTimeout(() => router.push("/account/login"), 3000);
      return;
    } else {
      const restrictUser = async () => {
        try {
          const response = await fetch("/api/user/restrict", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              userId: (session?.user as { _id: string })?._id as string,
            }),
          }).then((r) => r.json());

          if (response.userHasCreatedPost) {
            setIsLoading(true);
            setMessage(response.message);
            setTimeout(() => router.push(response.redirect), 3000);
            return;
          } else {
            setIsLoading(false);
            return;
          }
        } catch (error: any) {
          console.error("Main navigation error:", error);
        }
      };
      restrictUser();
      setIsLoading(false);
    }
  }, [session]);

  // Form data
  const titleInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const amenitiesRef = useRef<TAmenities[]>([]);
  const coordinatesRef = useRef<{ lng: number; lat: number }>({
    lng: 0,
    lat: 0,
  });

  // Image data states
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
  const [isLoading, setIsLoading] = useState(false);

  // Get coordinates from addmap
  const coordinates = ({ lat, lng }: { lat: number; lng: number }) => {
    coordinatesRef.current = { lng, lat };
  };

  // Get amenities from amenities box
  const amenitiesChecked = (amenity: TAmenities[]) => {
    amenitiesRef.current = amenity;
  };

  // Image handler
  // Select and push the image urls to the setSeletedImages array
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
    setIsLoading(true);
    setMessage(
      "Please wait for a moment. We're trying to make it as the best of the best!"
    );
    try {
      // Upload images to cloudinary
      const imageArray = [];

      // Loop all the selectedImages
      // Then save it to the cloudinary cloud storage
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
        // to store in the array of imageArray
        const image = {
          image: response.secure_url,
          public_id: response.public_id,
        };

        // Push the newImageData to the new array to later store in the postData object
        imageArray.push(image);
      }

      const post = {
        loves: [], // insert no element array
        image: imageArray.map((img) => ({
          image: img.image,
          public_id: img.public_id,
        })),
        // Capitalize the first character of the title inputted
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
        user: (session?.user as { _id: string })?._id as string, // id of the active user
      };

      // Log the response
      setMessage("Almost there!");
      console.log("Response: ", post);

      // const response = await fetch("/api/post/create", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(post),
      // }).then((r) => r.json());

      // if (!response.success) {
      //   setIsLoading(false);
      //   console.error(response.message);
      // }

      // console.log(response.message);
      // router.push(response.redirect);
      // location.reload();

      setMessage("Done!");
      setTimeout(() => {
        router.push("/");
        setIsLoading(false);
      }, 3000);
      // Catch Error of the whole function
    } catch (error: any) {
      setIsLoading(false);
      console.error("Failed to creating your post, ", error);
    }
  };
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
            <FormMap onMarkerClick={coordinates} />
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

          {/* City Selection */}
          {/* <div className="sm:col-span-6 mb-3">
            <label
              htmlFor="city"
              className="text-sm font-medium leading-6 text-gray-600"
            >
              City
            </label>
            <CityComboBox />
          </div> */}

          {/* Amenities Input  */}
          <div className="sm:col-span-6 border-t pt-10">
            <h2 className="text-sm font-medium leading-6 text-gray-600">
              Amenities
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <AmenityBox amenitiesChecked={amenitiesChecked} />
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
          <section className="flex gap-x-1.5 pt-5">
            {!isLoading && (
              <div>
                <Link href="/">
                  <button
                    type="button"
                    className="bg-gray-200 text-sm py-1.5 px-4 w-max rounded text-gray-900
                  hover:bg-gray-300 duration-300"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            )}
            {showContinue && (
              <div>
                <button
                  type="button"
                  className="bg-indigo-500 text-sm py-1.5 px-4 w-max rounded text-gray-100"
                  onClick={submitHandler}
                  disabled={isLoading}
                >
                  {!isLoading ? "Create a post" : "Creating your post..."}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      {isLoading && <LoadingPostModal message={message} />}
    </section>
  );
}
