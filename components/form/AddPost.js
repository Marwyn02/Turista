import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import AmenitiesBox from "../ui/AmenitiesBox";

const NewPostsForm = (props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [imageIndex, setImageIndex] = useState(0);

  const amenitiesRef = useRef([]);
  const coordinatesRef = useRef({ lng: 0, lat: 0 });
  const descriptionInputRef = useRef();
  const locationInputRef = useRef();
  const titleInputRef = useRef();

  const coor = ({ lat, lng }) => {
    coordinatesRef.current = { lng, lat };
  };

  const Map = dynamic(() => import("@/pages/map/Map"), {
    loading: () => "Loading...",
    ssr: false,
  });

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image && images.length < 3) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const newImage = [...images, e.target.result];
        setImages(newImage);
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(image);
    } else if (images.length >= 3) {
      alert("You have reached three images!");
    }
  };

  const amenitiesChecked = (amenity) => {
    amenitiesRef.current = amenity;
  };

  // Submit the input
  const submitInputHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const selectedCheckbox = amenitiesRef.current.map((check) => ({
      name: check.name,
      description: check.description,
      checked: check.checked,
    }));

    const postData = {
      image: selectedImage,
      title: enteredTitle,
      location: enteredLocation,
      coordinate: {
        lng: coordinatesRef.current.lng,
        lat: coordinatesRef.current.lat,
      },
      amenities: selectedCheckbox,
      description: enteredDescription,
      user: session.user._id,
    };

    console.log(postData);

    // try {
    //   const response = await fetch("/api/post/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(postData),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to create post");
    //   } else {
    //     router.push("/");
    //   }
    // } catch (error) {
    //   throw new Error("Error in create post: " + error);
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
            <Map onMarkerClick={coor} />
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
            <label
              className="text-sm font-medium leading-6 text-gray-600"
              htmlFor="image"
            >
              Image
            </label>

            <>
              <input
                id="image"
                name="image"
                type="file"
                // className="block w-full text-sm text-slate-500
                //       file:mr-4 file:py-2 file:px-4
                //       file:rounded-full file:border-0
                //       file:text-sm file:font-semibold
                //       file:bg-indigo-50 file:text-indigo-500
                //       hover:file:bg-indigo-100"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected Image"
                  className="h-[300px] w-full"
                />
              )}
              {images.length < 3 && (
                <button onClick={() => setSelectedImage(null)}>Clear</button>
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
};

export default NewPostsForm;
