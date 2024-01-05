import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";

import { ImageInput, ImagePreview } from "@/components/UI/Images/Image";

type TPersonalImageProps = {
  imageType: string;
};

export default function PersonalImage({ imageType }: TPersonalImageProps) {
  const { data: session } = useSession();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

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
              imageType: imageType,
            }),
          }).then((r) => r.json());

          if (responseAPI.success) {
            console.log("Response: ", responseAPI);
            router.push(responseAPI.path);
            // setIsLoading(false);
            return;
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
      {!imagePreview ? (
        <ImageInput
          onChange={(e) => handleImageChange(e, setImagePreview)}
          reference={imageInputRef}
        />
      ) : (
        <ImagePreview src={imagePreview} alt="Image Preview" />
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
