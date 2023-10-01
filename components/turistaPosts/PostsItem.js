import Card from "../ui/Card";

const PostsItem = (props) => {
  return <Card id={props.id} image={props.image} location={props.location} />;
};

export default PostsItem;
