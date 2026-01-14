import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";

import { AuthContext } from "../Context/authContext";
import "./NavLinks.css";

export default function Navlinks() {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  function logoutHandler() {
    authCtx.logout();
    navigate("/auth");
  }

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY PLACE</NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={logoutHandler}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
}
