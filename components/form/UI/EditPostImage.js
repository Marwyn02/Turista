import deleteImage from "@/pages/api/post/deleteImage";
import Image from "next/image";
import { useState, useRef } from "react";

export default function EditPostImage({ image, title }) {
  const [editClick, setEditClick] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);

  const [imageOnePreview, setImageOnePreview] = useState(null);
  const [imageTwoPreview, setImageTwoPreview] = useState(null);
  const [imageThreePreview, setImageThreePreview] = useState(null);
  const [editedImages, setEditedImages] = useState([]);

  const imageOneInputRef = useRef();
  const imageTwoInputRef = useRef();
  const imageThreeInputRef = useRef();

  const handleImageChange = async (e, setImagePreview, position) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setEditedImages((prevImages) => [...prevImages, imageFile]);
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(imageFile);
    }
  };

  const toggleImageSelection = (index) => {
    const imageToSelect = image[index];

    const isSelected = selectedImages.includes(imageToSelect);

    const updatedSelectedImages = isSelected
      ? selectedImages.filter((img) => img !== imageToSelect)
      : [...selectedImages, imageToSelect];

    setSelectedImages(updatedSelectedImages);
  };

  const deleteSelectedImages = () => {
    deleteImage(selectedImages);
  };

  console.log(editedImages);
  return (
    <>
      {/* Image one  */}
      {image[0] ? (
        <Image
          src={image[0].image}
          height={300}
          width={400}
          alt={title}
          name="image"
          id="image"
          className={`w-full md:rounded-lg duration-100
                  ${
                    selectedImages.includes(image[0])
                      ? "border-4 border-red-400"
                      : ""
                  }`}
          onClick={() => toggleImageSelection(0)}
        />
      ) : (
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
                  onChange={(e) => handleImageChange(e, setImageOnePreview, 0)}
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

      <div className="grid gap-x-3">
        {/* Image two  */}
        {image[1] && (
          <Image
            src={image[1].image}
            height={300}
            width={400}
            alt={title}
            name="image"
            id="image"
            className={`w-full md:rounded-lg duration-100
                      ${
                        selectedImages.includes(image[1])
                          ? "border-4 border-red-400"
                          : ""
                      }`}
            onClick={() => toggleImageSelection(1)}
          />
        )}
        {!imageTwoPreview && imageOnePreview && (
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
                      handleImageChange(e, setImageTwoPreview, 1)
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
            className="rounded-lg pt-3 "
          />
        )}

        {/* Image three  */}
        {image[2] && (
          <Image
            src={image[2].image}
            height={300}
            width={400}
            alt={title}
            name="image"
            id="image"
            className={`w-full md:rounded-lg duration-100
                      ${
                        selectedImages.includes(image[2])
                          ? "border-4 border-red-400"
                          : ""
                      }`}
            onClick={() => toggleImageSelection(2)}
          />
        )}
        {!imageThreePreview && imageTwoPreview && (
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
                    onChange={(e) =>
                      handleImageChange(e, setImageThreePreview, 2)
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
            className="rounded-lg pt-3 "
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        {selectedImages.length >= 1 ? (
          <button
            type="button"
            className="px-5 py-1.5 text-sm bg-red-200 duration-100 
                       rounded-lg mt-2 hover:bg-red-300 hover:text-white"
            onClick={deleteSelectedImages}
          >
            Remove Image(s)
          </button>
        ) : (
          <div></div>
        )}
        {imageThreePreview && (
          <button
            type="button"
            className="px-5 py-1.5 text-sm bg-red-200 duration-100 
              rounded-lg mt-2 hover:bg-red-300 hover:text-white"
          >
            Save Image(s)
          </button>
        )}
      </div>
    </>
  );
}
