import UsersList from "../components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "BIJAY SHRESTHA",
    image:
      "https://i.pinimg.com/1200x/66/28/ec/6628ec68361a312bdfd10c79e9e56df6.jpg",
    places: 3,
  },
];

export default function Users() {
  return <UsersList items={USERS} />;
}
