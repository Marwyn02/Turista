import { useSession } from "next-auth/react";
import router from "next/router";
import React, { useRef, useState } from "react";

export default function PersonalImage(props: any) {
  const { data: session } = useSession();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    props.isClicked();
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
  ): Promise<void> => {
    const image = e.target.files?.[0];

    if (image) {
      const reader: FileReader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        setSelectedImages((prevImages: File[]) => [...prevImages, image]);
        setImagePreview(e.target?.result as string);
      };

      reader.readAsDataURL(image);
    }
  };

  const updateImageHandler = async () => {
    // setLoading(true);
    try {
      if (selectedImages) {
        const form = new FormData();
        form.append("file", selectedImages[0]);
        form.append("upload_preset", "Turista-Uploads");
        form.append("folder", "Profile-Pictures");

        const response = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_URL as string,
          {
            method: "POST",
            body: form,
          }
        ).then((r) => r.json());

        console.log("Response: ", response);

        if (response) {
          const responseAPI = await fetch("/api/image/user/update", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              image: response.secure_url,
              userId: (session?.user as { _id: string })?._id as string,
            }),
          }).then((r) => r.json());

          if (responseAPI.success) {
            console.log("Response: ", responseAPI);
            router.push(responseAPI.path);
            // setIsLoading(false);
          }
        }
      } else {
        console.error("No selected image");
        // setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to update, ", error);
      //   setIsLoading(false);
    }
  };
  return (
    <section>
      <div className="flex justify-between py-1">
        <p className="font-bold text-gray-700 ">Profile Image</p>
        <button
          type="button"
          className="font-medium text-sm text-gray-800 hover:underline hover:text-black"
          onClick={() => handleEditToggle()}
        >
          Cancel
        </button>
      </div>
      <p className="text-sm text-gray-500 font-normal -mt-1.5">
        Display image must be in .png or .jpeg format
      </p>
      {!imagePreview ? (
        <div
          className="mt-2 flex justify-start rounded-lg border w-fit
                            border-dashed border-gray-900/25 p-12"
        >
          <div className="text-center">
            <div className="mt-2 flex text-sm leading-6 text-gray-600">
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
                  onChange={(e) => handleImageChange(e, setImagePreview)}
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
      ) : (
        <img
          src={imagePreview}
          alt="Preview 1"
          className="mt-2 md:mt-4 rounded-lg h-[150px] w-[150px]"
        />
      )}
      <button
        type="submit"
        className="mt-3 px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-black font-normal"
        onClick={updateImageHandler}
      >
        Save
      </button>
    </section>
  );
}
