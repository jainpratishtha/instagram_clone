import React, { useState, useEffect } from "react"; //useEffect is used so that /createPost runs after https://api.cloudinary.com/v1_1/insta-clone99/image/upload
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(""); //before uploading image to the backend we need to upload to the different storage service
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error)
            M.toast({ html: data.error, classes: "#d50000 red accent-4" });
          else {
            M.toast({
              html: "Post created",
              classes: "#00c853 green accent-4",
            });
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]); //useEffect kicks in when the url changes

  const postDetails = () => {
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
  return (
    <div className="card input-filed">
      <input
        type="text"
        placeholder="Title"
        style={{ color: "white" }}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Body"
        style={{ color: "white" }}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <div className="file-field input-field" style={{ color: "white" }}>
        <div className="btn  waves-effect waves-light #4527a0 deep-purple darken-3">
          <span>Upload Image</span>
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
        className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
        onClick={() => postDetails()}
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePost;
