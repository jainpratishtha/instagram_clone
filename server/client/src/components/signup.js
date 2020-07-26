import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData(); //study about this in fetch data in MDN
    data.append("file", image);
    data.append("upload_preset", "insta_clone");
    data.append("cloud_name", "insta-clone99");
    //take the link from dashborad of cloudinary base url and add /image/upload
    fetch("https://api.cloudinary.com/v1_1/insta-clone99/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        setUrl(data.url); //update the url
      })
      .catch((err) => console.log(err));
  };

  const uploadFields = () => {
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
        pic: url,
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

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
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

        <div className="file-field input-field" style={{ color: "white" }}>
          <div className="btn  waves-effect waves-light #4527a0 deep-purple darken-3">
            <span>Upload profile image</span>
            <input
              type="file"
              style={{ color: "white" }}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              style={{ color: "white" }}
            />
          </div>
        </div>

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
