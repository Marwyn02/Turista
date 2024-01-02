import React from "react";
import Image from "next/image";

type TInput = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  reference: React.RefObject<HTMLInputElement>;
};

type TPreview = {
  src: string;
  alt: string;
};

type TImg = {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  select: boolean;
  onClick: React.MouseEventHandler<HTMLImageElement>;
};

type TIcon = {
  src: string;
  alt: string;
  height: number;
  width: number;
  reference?: React.RefObject<HTMLImageElement>;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
};

// Images UI here are mostly in the forms

export const FormImage = ({
  src,
  alt,
  height,
  width,
  select,
  onClick,
}: TImg) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={height ?? 300}
      width={width ?? 300}
      className={`w-full md:rounded-lg duration-100 mt-2 hover:brightness-90
          ${select ? "border-4 border-red-400" : ""}`}
      onClick={onClick}
    />
  );
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

export const ImagePreview = ({ src, alt }: TPreview) => {
  return (
    <Image
      src={src}
      alt={alt}
      className="mt-2 md:mt-4 rounded-lg hover:brightness-90"
    />
  );
};

export const Icon = ({
  src,
  alt,
  height,
  width,
  reference,
  onClick,
}: TIcon) => {
  return (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      ref={reference}
      onClick={onClick}
    />
  );
};
