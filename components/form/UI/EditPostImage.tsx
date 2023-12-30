import React, { useState, useRef, FC } from "react";

import {
  CancelButton,
  ConfirmButton,
  DeleteButton,
} from "@/components/UI/Buttons/Button";

import { Image, ImageInput, ImagePreview } from "@/components/UI/Images/Image";

type TEditPostImageProps = {
  id: string;
  image: { image: string; public_id: string }[];
  title: string;
  updateImageData: (editedImages: File[]) => void;
};

const EditPostImage: FC<TEditPostImageProps> = ({
  id,
  image,
  title,
  updateImageData,
}) => {
  const [selectedImages, setSelectedImages] = useState<
    { image: string; public_id: string }[]
  >([]);

  const [imageOnePreview, setImageOnePreview] = useState<string | null>(null);
  const [imageTwoPreview, setImageTwoPreview] = useState<string | null>(null);
  const [imageThreePreview, setImageThreePreview] = useState<string | null>(
    null
  );
  const [editedImages, setEditedImages] = useState<File[]>([]);

  const imageOneInputRef = useRef<HTMLInputElement | null>(null);
  const imageTwoInputRef = useRef<HTMLInputElement | null>(null);
  const imageThreeInputRef = useRef<HTMLInputElement | null>(null);

  const [editLoading, setEditLoading] = useState(false);
  const [editSaved, setEditSaved] = useState(false);

  // File reader to preview the inputted file
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      const reader: FileReader = new FileReader();

      reader.onload = (e) => {
        setEditedImages((prevImages) => [...prevImages, imageFile]);
        setImagePreview(e.target?.result as string);
      };

      reader.readAsDataURL(imageFile);
    }
  };

  // Save image to cloudinary
  const submitImageHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setEditLoading(true);

    updateImageData(editedImages);
    setEditSaved(true);
    setEditLoading(false);
  };

  // Filtering the selected images
  const toggleImageSelection = (index: number) => {
    const imageToSelect = image[index];

    const isSelected = selectedImages.includes(imageToSelect);

    const updatedSelectedImages = isSelected
      ? selectedImages.filter((img) => img !== imageToSelect)
      : [...selectedImages, imageToSelect];

    setSelectedImages(updatedSelectedImages);
  };

  // Delete and remove the image to the post and the database
  const deleteSelectedImages = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      setEditLoading(true);

      console.log(selectedImages);

      const deletePromises = selectedImages.map(async (img) => {
        const response = await fetch("/api/image/remove", {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id, img }),
        }).then((r) => r.json());

        if (!response.success) {
          console.error(`Failed to delete image`);
        }
        console.log(response.message);
      });
      await Promise.all(deletePromises);

      setEditLoading(false);
      location.reload();
    } catch (error: any) {
      setEditLoading(false);
      console.error("Failed to delete image", error);
    }
  };
  return (
    <>
      <div>
        {/* Image one  */}
        {image[0] && (
          // Image one
          <Image
            src={image[0].image}
            alt={title}
            select={selectedImages.includes(image[0])}
            onClick={() => toggleImageSelection(0)}
          />
        )}
        {/* Image one input  */}
        {!imageOnePreview && !image[0] && (
          <ImageInput
            onChange={(e) => handleImageChange(e, setImageOnePreview)}
            reference={imageOneInputRef}
          />
        )}
        {/* Image one preview  */}
        {imageOnePreview && (
          <ImagePreview src={imageOnePreview} alt="Image Preview 1" />
        )}

        {/* Image two  */}
        {image[1] && (
          // Image two
          <Image
            src={image[1].image}
            alt={title}
            select={selectedImages.includes(image[1])}
            onClick={() => toggleImageSelection(1)}
          />
        )}
        {/* Image two input  */}
        {!imageTwoPreview && !image[1] && (
          <ImageInput
            onChange={(e) => handleImageChange(e, setImageTwoPreview)}
            reference={imageTwoInputRef}
          />
        )}
        {/* Image two preview  */}
        {imageTwoPreview && (
          <ImagePreview src={imageTwoPreview} alt="Image Preview 2" />
        )}

        {/* Image three  */}
        {image[2] && (
          <Image
            src={image[2].image}
            alt={title}
            select={selectedImages.includes(image[2])}
            onClick={() => toggleImageSelection(2)}
          />
        )}
        {!imageThreePreview && !image[2] && (
          <ImageInput
            onChange={(e) => handleImageChange(e, setImageThreePreview)}
            reference={imageThreeInputRef}
          />
        )}
        {imageThreePreview && (
          <ImagePreview src={imageThreePreview} alt="Image Preview 3" />
        )}
      </div>

      {/* Image Buttons  */}
      <div className="flex justify-between items-center mt-4 px-2 lg:px-0">
        <div className="flex gap-x-1">
          {/* If the selected images array is more than 1 element */}
          {selectedImages.length >= 1 && !editSaved && (
            // This removes the selected images in the post
            // that the user selected
            <DeleteButton onClick={deleteSelectedImages} disabled={editLoading}>
              {editLoading ? "Removing..." : "Remove it"}
            </DeleteButton>
          )}

          {(imageOnePreview || imageTwoPreview || imageThreePreview) &&
          !editSaved ? (
            // This removes the all added images in the array
            <CancelButton
              onClick={() => {
                setImageOnePreview(null);
                setImageTwoPreview(null);
                setImageThreePreview(null);
              }}
            >
              Clear added images
            </CancelButton>
          ) : null}
        </div>

        {imageThreePreview && !editSaved && (
          // This saves the modified array of images
          <ConfirmButton onClick={submitImageHandler} disabled={editLoading}>
            {editLoading ? "Saving..." : "Save it"}
          </ConfirmButton>
        )}

        {editSaved && (
          <button
            type="button"
            className="px-5 py-1.5 text-sm bg-gray-100 duration-100 text-violet-500 font-medium
            rounded-lg mt-2 hover:bg-gray-300 hover:text-green-500"
            disabled
          >
            Saved
          </button>
        )}
      </div>
      {imageThreePreview && !editSaved && (
        <p className="px-5 text-xs text-gray-400 mt-5">
          Note: Save the images here.
        </p>
      )}
    </>
  );
};

export default EditPostImage;
