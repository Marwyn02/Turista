import Image from "next/image";
import { useRouter } from "next/router";

export default function PostsItem({ id, image, location }) {
  const router = useRouter();
  return (
    <section>
      <main key={id} className="pt-[100%] relative rounded-xl duration-300">
        <Image
          className="absolute inset-0 h-full w-full cursor-pointer object-cover rounded-lg border border-transparent hover:border-gray-500 duration-300"
          src={image}
          height={100}
          width={200}
          alt="Image"
          onClick={() => router.push(`/${id}`)}
        />
      </main>
      <section className="py-0.5 md:py-1.5">
        <p className="font-medium text-gray-900 text-sm">{location}</p>
      </section>
    </section>
  );
}
