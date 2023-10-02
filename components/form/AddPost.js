import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import AmenitiesBox from "../ui/AmenitiesBox";

export default function AddPost() {
  const { data: session } = useSession();
  const router = useRouter();

  const [images, setImages] = useState([]);

  const amenitiesRef = useRef([]);
  const coordinatesRef = useRef({ lng: 0, lat: 0 });
  const descriptionInputRef = useRef();
  const locationInputRef = useRef();
  const titleInputRef = useRef();
  const imageInputRef = useRef([]);

  const coordinates = ({ lat, lng }) => {
    coordinatesRef.current = { lng, lat };
  };

  const Map = dynamic(() => import("@/pages/map/Map"), {
    loading: () => "Loading...",
    ssr: false,
  });

  // Image handler
  const handleImageChange = async (e) => {
    const image = e.target.files[0];

    if (image && images.length < 3) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const newImage = [...images, { url: e.target.result }];
        setImages(newImage);
      };
      reader.readAsDataURL(image);
    }
  };

  const amenitiesChecked = (amenity) => {
    amenitiesRef.current = amenity;
  };

  // Submit the input
  const submitInputHandler = async (e) => {
    e.preventDefault();

    // const form = e.currentTarget;
    // const fileInput = Array.from(form.elements).find(
    //   ({ name }) => name === "image"
    // );
    for (let i = 0; i < imageInputRef.current.files.length; i++) {
      const file = imageInputRef.current.files[i];

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Turista-Uploads");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgzsmdvo4/image/upload",
        {
          method: "POST",
          body: data,
        }
      ).then((r) => r.json());

      console.log(response);
    }

    // console.log(imageInputRef.current.files.length);
    // console.log("FILEINPUT: ", fileInput.files);

    // for (let i = 0; i < images.length; i++) {
    //   const file = images[i]

    //   const formData = new FormData();

    //   for (const file of fileInput.files) {
    //     formData.append("file", file);
    //   }
    //   formData.append("upload_preset", "Turista-Uploads");

    // const data = await fetch(
    //   "https://api.cloudinary.com/v1_1/dgzsmdvo4/image/upload",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // ).then((r) => r.json());
    //   }

    // console.log(images[0].url);
    // console.log("FORM: ", fileInput.files);

    const enteredTitle = titleInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const selectedCheckbox = amenitiesRef.current.map((check) => ({
      name: check.name,
      description: check.description,
      checked: check.checked,
    }));
    const img = images.map((i) => ({
      url: i.url,
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

    // console.log(postData);

    // try {
    //   const response = await fetch("/api/post/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(postData),
    //   });

    //   if (response.ok) {
    //     const res = await response.json();
    //     console.log(res.message);
    //     router.push(res.redirect);
    //   } else {
    //     throw new Error(res.message);
    //   }
    // } catch (error) {
    //   throw new Error("Error in Create Post Submit Handler: ", error);
    // }
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
            <>
              {images.length < 3 && (
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="block w-full text-sm text-slate-500 mt-1 mb-2.5
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-500
                        hover:file:bg-indigo-100"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imageInputRef}
                  multiple
                />
              )}
              {images && (
                <>
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt="Selected Image"
                      className="h-[200px] w-full rounded-lg my-2"
                    />
                  ))}
                </>
              )}
              {images.length <= 3 && images.length !== 0 ? (
                <button
                  onClick={(e) => {
                    setImages([]);
                    e.preventDefault();
                  }}
                  className="bg-gray-100 text-xs border rounded-full px-1.5 py-0.5 text-gray-700"
                >
                  Clear image(s)
                </button>
              ) : (
                ""
              )}
            </>
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

          {/* Submit and cancel buttons */}
          <div className="flex gap-x-1.5 pt-5">
            <div>
              <Link href="/">
                <button className="bg-gray-200 text-sm py-1 px-1.5 w-max rounded text-gray-900">
                  Cancel
                </button>
              </Link>
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
}
