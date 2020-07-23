import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({
        html: "Invalid email",
        classes: "#d50000 red accent-4",
      });
    }
    fetch("/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error)
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "Welcome Back!!",
            classes: "#00c853 green accent-4",
          });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="myCard ">
      <div className="card input-field auth-card">
        <h2>Instagram</h2>
        <input
          style={{ color: "white" }}
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ color: "white" }}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => {
            PostData();
          }}
          className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
        >
          Login
        </button>
        <h6>
          <Link to="/signup">New on Instagram? Signup</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
