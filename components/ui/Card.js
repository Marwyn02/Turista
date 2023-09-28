import { useRouter } from "next/router";
import { useEffect } from "react";

const Card = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.image === "") {
      setHasImage(false);
    }
  }, [props.image]);

  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <div>
      <main
        key={props.id}
        className="pt-[100%] relative rounded-xl duration-300"
      >
        <img
          src={props.image}
          alt={props.title}
          onClick={showDetailsHandler}
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
