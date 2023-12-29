import React from "react";

type TInput = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  reference: any;
};

type TPreview = {
  source: any;
  alt: string;
};

export const ImageInput = ({ onChange, reference }: TInput) => {
  return (
    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center">
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="image"
            className="relative cursor-pointer rounded-md bg-white 
                   font-semibold text-indigo-600 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onChange}
              ref={reference}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
};

export const ImagePreview = ({ source, alt }: TPreview) => {
  return <img src={source} alt={alt} className="mt-2 md:mt-4 rounded-lg" />;
};