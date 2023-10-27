import Image from "next/image";
import { useState, useRef } from "react";

export default function EditPostImage({ id, image, title, updateImageData }) {
  // const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

  const [selectedImages, setSelectedImages] = useState([]);

  const [imageOnePreview, setImageOnePreview] = useState(null);
  const [imageTwoPreview, setImageTwoPreview] = useState(null);
  const [imageThreePreview, setImageThreePreview] = useState(null);
  const [editedImages, setEditedImages] = useState([]);

  const imageOneInputRef = useRef();
  const imageTwoInputRef = useRef();
  const imageThreeInputRef = useRef();

  const [editLoading, setEditLoading] = useState(false);
  const [editSaved, setEditSaved] = useState(false);

  // File reader to preview the inputted file
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

  // Save image to cloudinary
  const submitImageHandler = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      const updatedImages = [...image];

      for (const images of editedImages) {
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
        updatedImages.push(newImageData);
      }

      updateImageData(updatedImages);
      setEditSaved(true);
      setEditLoading(false);
    } catch (error) {
      setEditLoading(false);
      console.error("Error updating image data", error);
    }
  };

  // Filtering the selected images
  const toggleImageSelection = (index) => {
    const imageToSelect = image[index];

    const isSelected = selectedImages.includes(imageToSelect);

    const updatedSelectedImages = isSelected
      ? selectedImages.filter((img) => img !== imageToSelect)
      : [...selectedImages, imageToSelect];

    setSelectedImages(updatedSelectedImages);
  };

  // Delete and remove the image to the post and the database
  const deleteSelectedImages = async (e) => {
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
        });

        if (!response.ok) {
          console.error(`Failed to delete image: ${img.public_id}`);
        }
        const res = await response.json();
        console.log(res.message);
      });
      await Promise.all(deletePromises);

      setEditLoading(false);
      location.reload();
    } catch (error) {
      setEditLoading(false);
      console.error("Failed to delete image", error);
    }
  };
  return (
    <>
      <div>
        {/* Image one  */}
        {image[0] && (
          <Image
            src={image[0].image}
            height={300}
            width={400}
            alt={title}
            name="image"
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
                    onChange={(e) =>
                      handleImageChange(e, setImageOnePreview, 0)
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
            className="md:rounded-lg hover:brightness-90"
          />
        )}

        {/* Image two  */}
        {image[1] && (
          <Image
            src={image[1].image}
            height={300}
            width={400}
            alt={title}
            name="image"
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
            className="md:rounded-lg mt-0.5 md:mt-3 hover:brightness-90"
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

          {imageOnePreview || imageTwoPreview || imageThreePreview ? (
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
            className="px-5 py-1.5 text-sm bg-green-200 duration-100 text-gray-600
            rounded-lg mt-2 hover:bg-green-300 hover:text-white"
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
}
