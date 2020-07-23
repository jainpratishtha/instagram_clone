import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
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
    fetch("/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error)
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        else {
          M.toast({ html: data.msg, classes: "#00c853 green accent-4" });
          history.push("/login");
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
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          Sign up
        </button>
        <h6>
          <Link to="/login">Already have an account? Login</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
