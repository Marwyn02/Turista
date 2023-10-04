import Image from "next/image";

export default function EditPostImage({ image, title }) {
  return (
    <>
      <Image
        src={image[0].image}
        height={300}
        width={400}
        alt={title}
        name="image"
        id="image"
        className="w-full md:rounded-lg"
      />
      <div
        className={`grid gap-x-3 pt-3 ${
          image.length === 2 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {image[1] && (
          <Image
            src={image[1].image}
            height={300}
            width={400}
            alt={title}
            name="image"
            id="image"
            className="w-full md:rounded-lg"
          />
        )}
        {image[2] && (
          <Image
            src={image[2].image}
            height={300}
            width={400}
            alt={title}
            name="image"
            id="image"
            className="w-full md:rounded-lg"
          />
        )}
      </div>
    </>
  );
}
