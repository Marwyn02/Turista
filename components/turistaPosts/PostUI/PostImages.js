import Image from "next/image";

export default function PostImages({ images }) {
  return (
    <div className="md:grid md:grid-rows-4 md:grid-cols-3 md:gap-4">
      <div className="md:row-span-4 md:col-span-2">
        <Image
          className="animated-slide md:rounded-lg h-full w-full hover:brightness-90 duration-100"
          src={images[0].image}
          width={1000}
          height={1000}
          alt="Image 1"
        />
      </div>
      {images[1] ? (
        <div className="hidden md:block md:row-span-2">
          <Image
            className="md:rounded-lg w-full h-full hover:brightness-90 duration-100"
            src={images[1].image}
            width={400}
            height={250}
            alt="Image 2"
          />
        </div>
      ) : (
        ""
      )}
      {images[2] ? (
        <div className="hidden md:block md:row-span-2">
          <Image
            className="md:rounded-lg w-full h-full hover:brightness-90 duration-100"
            src={images[2].image}
            width={400}
            height={250}
            alt="Image 3"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
