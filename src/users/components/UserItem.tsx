import { Link } from "react-router";

import "./UserItem.css";
import { type User } from "./type";
import Avatar from "../../shared/UIElements/Avatar";
import Card from "../../shared/UIElements/Card";

type UserItemProps = User;

export default function UserItem(props: UserItemProps) {
  return (
    <li className="user-item">
      <Card className="user-item__glass">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.places} {props.places === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}
