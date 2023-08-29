import { useRouter } from "next/router";

const Card = (props) => {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <section
      key={props.id}
      className="bg-neutral-800 mb-7 drop-shadow-lg shadow-white/20 hover:bg-white/20 duration-300 rounded"
      onClick={showDetailsHandler}
    >
      <div className="p-4">
        <h1 className="text-zinc-50 font-semibold">{props.title}</h1>
        <p className="text-xs -mt-1 text-zinc-50/30 font-light">
          {props.location}
        </p>
        <p className="mt-2 text-zinc-100 text-base font-light">
          {props.description}
        </p>
      </div>
      <img src={props.image} alt={props.title} />
    </section>
  );
};

export default Card;
