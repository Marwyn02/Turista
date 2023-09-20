import Map from "./Map";
import NewPostsForm from "@/components/form/AddPost";

const MapContainer = () => {
  const coor = ({ lat, lng }) => {
    console.log("Joke time");
    console.log(lat);
  };
  return (
    <div>
      MapContainer
      <Map onMarkerClick={coor} />
    </div>
  );
};

export default MapContainer;
