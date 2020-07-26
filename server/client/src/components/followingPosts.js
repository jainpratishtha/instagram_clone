import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
const FollowingPosts = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/followingPosts", {
      headers: {
        // prettier-ignore
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        //prettier-ignore
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        //prettier-ignore
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  {
    //   const deleteComment = (postid, commentid) => {
    //   // console.log(commentid);
    //   fetch(`/deleteComment/${postid}/${commentid}`, {
    //     method: "delete",
    //     headers: {
    //       //prettier-ignore
    //       "Authorization": "Bearer " + localStorage.getItem("jwt")
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((result) => {
    //       console.log(result);
    //       // const newData = data.filter((item) => {
    //       //   return item._id !== result._id;
    //       // });
    //       // setData(newData);
    //     });
    // };
  }
  return (
    <div className="home">
      {data.map((item) => {
        {
          /* console.log(item); */
        }
        return (
          <div
            className="card home-card"
            style={{ backgroundColor: "black" }}
            key={item._id}
          >
            <h5>
              <Link
                style={{ color: "white" }}
                to={
                  item.postedBy._id !== state._id
                    ? "/profile/" + item.postedBy._id
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>
              {item.postedBy._id === state._id && (
                <i
                  className="material-icons"
                  style={{ float: "right" }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => unlikePost(item._id)}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => likePost(item._id)}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} Likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((comment) => {
                return (
                  <h6>
                    <span style={{ fontWeight: "500" }}>
                      {comment.postedBy.name}&nbsp;&nbsp;
                    </span>
                    {comment.text}

                    {comment.postedBy._id === state._id && (
                      <i
                        className="material-icons"
                        style={{ float: "right" }}
                        onClick={() => {
                          alert("coming soon");
                          // deleteComment(item._id, comment._id);
                        }}
                      >
                        delete
                      </i>
                    )}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                  e.target[0].value = "";
                }}
              >
                <input
                  type="text"
                  placeholder="add a comment"
                  style={{ color: "white", display: "inline" }}
                />
                <button
                  type="submit"
                  className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
                  style={{ display: "inline" }}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowingPosts;
