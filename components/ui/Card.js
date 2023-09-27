import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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

// <section
//   key={props.id}
//   className={
//     !hasImage
//       ? "bg-gray-100 mb-5 md:rounded-lg drop-shadow-lg cursor-pointer md:border border-transparent hover:md:border-black/50 duration-200"
//       : " mb-5 md:rounded-lg duration-200 border border-black"
//   }
//   onClick={!hasImage ? showDetailsHandler : undefined}
// >
{
  /* <div className="p-4">
        <h1 className="text-zinc-600 font-semibold text-xl">{props.title}</h1>
        <p className="text-xs mt-2 text-black">{props.location}</p>
        {!hasImage ? (
          <p className="mt-2 text-zinc-800 text-base font-light">
            {props.description}
          </p>
        ) : null}
      </div> */
}

//   <div>{props.location}</div>
// </section>
