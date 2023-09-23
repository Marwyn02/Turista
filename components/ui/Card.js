import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Card = (props) => {
  const router = useRouter();
  const [hasImage, setHasImage] = useState(true);

  useEffect(() => {
    if (props.image === "") {
      setHasImage(false);
    }
  }, [props.image]);

  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <section
      key={props.id}
      className={
        !hasImage
          ? "bg-gray-100 mb-5 md:rounded-lg drop-shadow-lg cursor-pointer md:border border-transparent hover:md:border-black/50 duration-200"
          : "bg-gray-100 mb-5 md:rounded-lg drop-shadow-lg md:border border-transparent hover:md:border-black/50 duration-200"
      }
      onClick={!hasImage ? showDetailsHandler : undefined}
    >
      <div className="p-4">
        <h1 className="text-zinc-600 font-semibold text-xl">{props.title}</h1>
        <p className="text-xs mt-2 text-black">{props.location}</p>
        {!hasImage ? (
          <p className="mt-2 text-zinc-800 text-base font-light">
            {props.description}
          </p>
        ) : null}
      </div>
      {hasImage && (
        <img
          src={props.image}
          alt={props.title}
          onClick={showDetailsHandler}
          className="md:rounded-b-lg cursor-pointer drop-shadow-lg"
        />
      )}
    </section>
  );
};

export default Card;
