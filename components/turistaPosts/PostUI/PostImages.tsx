import { FC } from "react";
import Image from "next/image";

interface PostImagesProps {
  images: {
    image: string;
    public_id: string;
  }[];
}

const PostImages: FC<PostImagesProps> = ({ images }) => {
  return (
    <div className="md:grid md:grid-rows-4 md:grid-cols-3 md:gap-4">
      {images[0] && (
        <div className="md:row-span-4 md:col-span-2">
          <Image
            className="animated-slide md:rounded-lg w-full hover:brightness-90 duration-100"
            src={images[0].image}
            width={1000}
            height={1000}
            alt="Image 1"
          />
        </div>
      )}
      {images[1] && (
        <section className="hidden md:block md:row-span-2 w-full h-full relative">
          <div className="w-full h-full overflow-hidden">
            <Image
              className="animated-slide md:rounded-lg w-full h-full object-cover hover:brightness-90 duration-100"
              src={images[1].image}
              fill={true}
              alt="Image 2"
            />
          </div>
        </section>
      )}
      {images[2] && (
        <section className="hidden md:block md:row-span-2 w-full h-full relative">
          <div className="w-full h-full overflow-hidden">
            <Image
              className="animated-slide md:rounded-lg w-full h-full object-cover hover:brightness-90 duration-100"
              src={images[2].image}
              fill={true}
              alt="Image 3"
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default PostImages;
