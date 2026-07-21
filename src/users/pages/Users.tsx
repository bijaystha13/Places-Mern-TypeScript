import UsersList from "../components/UsersList";
import { type User } from "../components/type";

const USERS: User[] = [
  {
    id: "u1",
    name: "BIJAY SHRESTHA",
    image:
      "https://i.pinimg.com/1200x/6a/0f/f0/6a0ff0634214b5ba31e8ce1f49495d29.jpg",
    places: 3,
  },
];

export default function Users() {
  return <UsersList items={USERS} />;
}
