import React, { useContext } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
//Link is better than anchor tags because pages does load every time we click on it
const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">
            <img
              className="profile_small_photo"
              style={{ margin: "15px 0 0 0" }}
              src={state.pic}
              alt="profile"
            />
          </Link>
        </li>,
        <li>
          <Link
            to="#"
            onClick={() => {
              alert("coming soon!!");
            }}
          >
            <i class="material-icons">chat</i>
          </Link>
        </li>,
        <li>
          <Link to="/followingPosts">Following Posts</Link>
        </li>,
        <li>
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
            className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper black">
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
