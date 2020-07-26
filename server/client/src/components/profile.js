import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const [image, setImage] = useState();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/myPosts", {
      headers: {
        // prettier-ignore
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);
  useEffect(() => {
    if (image) {
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
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              // prettier-ignore
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              //window.location.reload()
            });
        })
        .catch((err) => {
          console.log(err);
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? state.pic : "loading..."}
            alt="profile"
          />
        </div>
        <div>
          <h4>
            {state ? state.name : "Loading"}
            <div style={{ diapley: "block" }}>
              {state ? state.email : "Loading"}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>{mypics.length} posts</h6>
              <h6>{state ? state.followers.length : "0"} followers</h6>
              <h6>{state ? state.following.length : "0"} following</h6>
            </div>

            <h6 style={{ display: "inline" }}>
              <div
                className="file-field input-field"
                style={{ color: "white" }}
              >
                <div className="btn  waves-effect waves-light #4527a0 deep-purple darken-3">
                  <span>update DP</span>
                  <input
                    type="file"
                    style={{ color: "white" }}
                    onChange={(e) => {
                      updatePhoto(e.target.files[0]);
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
            </h6>
          </h4>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return <img className="item" src={item.photo} alt={item.title} />;
        })}
      </div>
      <h6
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/createPost">
          <button className="btn waves-effect waves-light #4527a0 deep-purple darken-3">
            new post
          </button>
        </Link>
      </h6>
    </div>
  );
};

export default Profile;
