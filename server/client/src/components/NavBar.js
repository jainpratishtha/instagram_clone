import React, { useEffect, useState, useContext, useRef } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
//Link is better than anchor tags because pages does load every time we click on it
const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <i className="material-icons modal-trigger" data-target="modal1">
            search
          </i>
        </li>,
        <li key="2">
          <Link to="/profile">
            <img
              className="profile_small_photo"
              style={{ margin: "15px 0 0 0" }}
              src={state.pic}
              alt="profile"
            />
          </Link>
        </li>,
        <li key="3">
          <Link
            to="#"
            onClick={() => {
              alert("coming soon!!");
            }}
          >
            <i class="material-icons">chat</i>
          </Link>
        </li>,
        <li key="4">
          <Link to="/followingPosts">Following Posts</Link>
        </li>,
        <li key="5">
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
        <li key="6">
          <Link to="/login">Login</Link>
        </li>,
        <li key="7">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  const fetachUser = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
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
      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ backgroundColor: "black", color: "white" }}
      >
        <div className="modal-content">
          <input
            type="text"
            value={search}
            placeholder="search"
            style={{ color: "white" }}
            onChange={(e) => {
              fetachUser(e.target.value);
            }}
          />
          <ul className="collection" style={{ backgroundColor: "black" }}>
            {userDetails.map((item) => {
              return (
                <Link
                  to={
                    item._id !== state._id ? "/profile/" + item._id : "/profile"
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <li
                    className="collection-item"
                    style={{ backgroundColor: "black" }}
                  >
                    {item.email}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div
          className="modal-footer"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <button
            onClick={() => setSearch("")}
            className="modal-close btn waves-effect waves-light #4527a0 deep-purple darken-3"
          >
            Close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
