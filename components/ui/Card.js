import { useRouter } from "next/router";

const Card = (props) => {
  const router = useRouter();
  return (
    <div>
      <main
        key={props.id}
        className="pt-[100%] relative rounded-xl duration-300"
      >
        <img
          src={props.image}
          alt={props.title}
          onClick={() => router.push(`/${props.id}`)}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover rounded-lg border border-transparent hover:border-gray-500 duration-300"
        />
      </main>
      <section className="py-0.5 md:py-1.5">
        <p className="font-medium text-gray-900 text-sm">{props.location}</p>
      </section>
    </div>
  );
};

export default Card;
