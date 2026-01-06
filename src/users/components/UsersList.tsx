import UserItem from "./UserItem";
import { type User } from "./type";
import Card from "../../shared/UIElements/Card";
import "./UsersList.css";

interface UsersListProps {
  items: User[];
}

export default function UsersList(props: UsersListProps) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          places={user.places}
        />
      ))}
    </ul>
  );
}
