import Card from "../../shared/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";
import { type Place } from "./type";

interface PlaceListProps {
  items: Place[];
}

export default function PlaceList(props: PlaceListProps) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creatorId}
          coordinates={place.coordinates}
        />
      ))}
    </ul>
  );
}
