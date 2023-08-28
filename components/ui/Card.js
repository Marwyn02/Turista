import { useRouter } from "next/router";

const Card = (props) => {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <section
      key={props.id}
      className="bg-neutral-800 mb-7 drop-shadow-lg shadow-white/20"
      onClick={showDetailsHandler}
    >
      <div className="p-2.5">
        <h1 className="text-zinc-50 font-bold">{props.title}</h1>
        <p className="text-xs -mt-1 text-zinc-50/30 font-light">
          {props.location}
        </p>
        <p className="mt-2 text-zinc-100 text-base font-light">
          {props.description}
        </p>
      </div>
      <img src={props.image} alt="Yew" />
    </section>
  );
};

export default Card;
