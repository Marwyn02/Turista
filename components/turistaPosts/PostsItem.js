import Card from "../ui/Card";

const PostsItem = (props) => {
  return (
    <Card
      id={props.id}
      title={props.title}
      location={props.location}
      description={props.description}
      image={props.image}
    />
  );
};

export default PostsItem;
