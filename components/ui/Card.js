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
    console.log(props.image);
    router.push("/" + props.id);
  };

  return (
    <section
      key={props.id}
      className="bg-gray-100 mb-5 rounded-lg drop-shadow-sm"
      onClick={!hasImage ? showDetailsHandler : undefined}
    >
      <div className="p-4">
        <h1 className="text-zinc-600 font-semibold">{props.title}</h1>
        <p className="text-xs -mt-1 text-zinc-900/60 font-light">
          {props.location}
        </p>
        <p className="mt-2 text-zinc-800 text-base font-light">
          {props.description}
        </p>
      </div>
      {hasImage && (
        <img
          src={props.image}
          alt={props.title}
          onClick={showDetailsHandler}
          className="rounded-b-lg cursor-pointer"
        />
      )}
    </section>
  );
};

export default Card;
