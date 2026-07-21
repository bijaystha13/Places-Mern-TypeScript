import { useParams } from "react-router";

import PlaceList from "../components/PlaceList";
import { type Place } from "../components/type";

const DUMMY_PLACES: Place[] = [
  {
    id: "p1",
    title: "BIJAY",
    description: "YOHAHA",
    image:
      "https://i.pinimg.com/736x/c6/94/f3/c694f381a882ce49c591e2f441f0a74e.jpg",
    address: "CAUSA",
    coordinates: { lat: 40.7484405, lng: -73.9878584 },
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "BIJAY S",
    description: "YOHAHA",
    image:
      "https://i.pinimg.com/736x/96/d0/e0/96d0e0011a772fde0b37a98ba2f82a3a.jpg",
    address: "CAUSA",
    coordinates: { lat: 40.7484405, lng: -73.9878584 },
    creatorId: "u2",
  },
];

export default function UserPlaces() {
  const userId = useParams().userId;
  const loadedPlace = DUMMY_PLACES.filter(
    (place) => place.creatorId === userId,
  );
  return <PlaceList items={loadedPlace} />;
}
