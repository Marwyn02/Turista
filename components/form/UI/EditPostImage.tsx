import React, { useState, useRef, FC } from "react";

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
          <img
            src={image[0].image}
            alt={title}
            id="image"
            className={`w-full md:rounded-lg duration-100 mt-2 hover:brightness-90
                  ${
                    selectedImages.includes(image[0])
                      ? "border-4 border-red-400"
                      : ""
                  }`}
            onClick={() => toggleImageSelection(0)}
          />
        )}
        {!imageOnePreview && !image[0] && (
          <div
            className="mt-2 flex justify-center rounded-lg border
                  border-dashed border-gray-900/25 px-6 py-10"
          >
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload-0"
                  className="relative cursor-pointer rounded-md bg-white
                     font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload-0"
                    name="file-upload-0"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handleImageChange(e, setImageOnePreview)}
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
            className="md:rounded-lg hover:brightness-90"
          />
        )}

        {/* Image two  */}
        {image[1] && (
          <img
            src={image[1].image}
            alt={title}
            id="image"
            className={`w-full md:rounded-lg duration-100 mt-2 hover:brightness-90
                      ${
                        selectedImages.includes(image[1])
                          ? "border-4 border-red-400"
                          : ""
                      }`}
            onClick={() => toggleImageSelection(1)}
          />
        )}
        {!imageTwoPreview && !image[1] && (
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
                    onChange={(e) => handleImageChange(e, setImageTwoPreview)}
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
            className="md:rounded-lg mt-0.5 md:mt-3 hover:brightness-90"
          />
        )}

        {/* Image three  */}
        {image[2] && (
          <img
            src={image[2].image}
            alt={title}
            id="image"
            className={`w-full md:rounded-lg duration-100 mt-2 hover:brightness-90
                      ${
                        selectedImages.includes(image[2])
                          ? "border-4 border-red-400"
                          : ""
                      }`}
            onClick={() => toggleImageSelection(2)}
          />
        )}
        {!imageThreePreview && !image[2] && (
          <div
            className="mt-2 flex justify-center rounded-lg border
                      border-dashed border-gray-900/25 px-6 py-10"
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
                    onChange={(e) => handleImageChange(e, setImageThreePreview)}
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
            className="md:rounded-lg mt-0.5 md:mt-3 hover:brightness-90"
          />
        )}
      </div>

      {/* Button navigations  */}
      <div className="flex justify-between items-center px-2 lg:px-0">
        <div className="flex gap-x-1">
          {selectedImages.length >= 1 && !editSaved ? (
            <button
              type="button"
              className="px-8 py-2 text-xs md:text-sm bg-red-400 text-white duration-300
                       rounded mt-2 hover:bg-red-500"
              onClick={deleteSelectedImages}
              disabled={editLoading}
            >
              {editLoading ? "Removing..." : "Remove"}
            </button>
          ) : (
            <div></div>
          )}

          {(imageOnePreview || imageTwoPreview || imageThreePreview) &&
          !editSaved ? (
            <button
              type="button"
              className="px-4 py-2 text-xs md:text-sm bg-gray-200 text-gray-500 duration-300
              rounded mt-2 hover:bg-gray-300 hover:text-gray-600"
              onClick={() => {
                setImageOnePreview(null);
                setImageTwoPreview(null);
                setImageThreePreview(null);
              }}
            >
              Clear added images
            </button>
          ) : null}
        </div>

        {imageThreePreview && !editSaved && (
          <button
            type="button"
            className="px-8 py-2 text-xs md:text-sm bg-indigo-500 text-white duration-300
              rounded mt-2 hover:bg-indigo-600 hover:text-white"
            disabled={editLoading}
            onClick={submitImageHandler}
          >
            {editLoading ? "Saving..." : "Save Changes"}
          </button>
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
