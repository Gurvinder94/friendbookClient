import React from "react";
import { useState } from "react";
import Subcomment from "./Subcomment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Likelist from "./Likelist";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../server";

function Comment({
  fetch,
  addLike,
  firstname,
  lastname,
  posts,
  username,
  _id,
}) {
  const [input, setInput] = useState("");
  const [subInput, setSubInput] = useState([]);
  const [comIn, setComIn] = useState([]);
  const [comList, setComList] = useState([]);
  const [likearr, setLikearr] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
      await axios.post("/postImage", { username, input: fileReader.result });
      await fetch();
      setLoading(false);
    };
  };

  const removeComment = async (id, index, username) => {
    let temp = [...subInput];
    temp.splice(index, 1);
    await axios.delete(`/deleteComment/${username}/${id}`).then((result) => {
      fetch();
      setSubInput(temp);
    });
  };

  const postComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input.length > 0) {
      await axios.post("/postComment", { username, input });
      let temp = ["", ...subInput];
      setSubInput(temp);
      setInput("");
      await fetch();
      setLoading(false);
    }
  };

  const postSubComment = async (e, index, _id, userId) => {
    e.preventDefault();
    setComList[index] = true;
    if (subInput[index].length > 0) {
      let temp = [...subInput];
      temp[index] = "";
      await axios.post("/postsubComment", {
        username,
        subInput: subInput[index],
        firstname,
        lastname,
        _id,
        userId,
      });
      fetch();
      setSubInput(temp);
    }
  };

  const like = async (userId, postId) => {
    addLike(postId);
    await axios.post("/like", {
      userId,
      username,
      firstname,
      lastname,
      postId,
    });
  };

  const likeList = () => {
    setLikearr([]);
  };

  return (
    <div className="comment">
      {loading && <CircularProgress className="loading" />}
      <form className="commentForm">
        <textarea
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="commentInput"
          cols="50"
          rows="1"
          placeholder="Comment"
          value={input}
        ></textarea>
        <div className="shareCont">
          <button
            onClick={(e) => postComment(e)}
            value="Submit"
            className="commentButton"
          >
            Submit
          </button>
          <div className="input" style={{ margin: 0 }}>
            <input
              onChange={(e) => handleFileUpload(e)}
              type="file"
              name="upload_file"
              accept="image/*"
              id="file"
            />
            <label
              style={{
                background: "#3c8af0",
                width: "120px",
                height: "40px",
                fontFamily: "arial",
                fontSize: "13px",
              }}
              htmlFor="file"
            >
              Share image
            </label>
          </div>
        </div>
      </form>
      {posts.length > 0 &&
        posts.map((arr, index) => {
          return (
            <>
              <form className="commentForm" id={arr.username} key={arr._id}>
                <div className="commentHead">
                  <div className="commentLogo">
                    {arr.firstname[0].toUpperCase()}
                  </div>
                  <div className="commentTitle">{`${arr.firstname} ${arr.lastname}`}</div>
                  <div className="removeIcon">
                    {_id === arr.userId ? (
                      <DeleteForeverIcon
                        onClick={() => {
                          removeComment(arr._id, index, username);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {arr.image ? (
                  <img
                    src={arr.image}
                    style={{
                      width: "75%",
                      margin: "auto",
                      borderRadius: "20px",
                    }}
                    alt=""
                  />
                ) : (
                  <div className="commentText">{arr.comment}</div>
                )}
                <div className="likeBox">
                  <div
                    className="like"
                    onClick={() => {
                      let temp = [...arr.likes];
                      setLikearr(temp);
                    }}
                  >
                    <ThumbUpIcon /> <div>{arr.likes.length}</div>
                  </div>
                  <div
                    className="commentBox1"
                    onClick={() => {
                      if (comList[index] === true) {
                        let templi = [...comList];
                        templi[index] = false;
                        let tempin = [...comIn];
                        tempin[index] = false;
                        setComList(templi);
                        setComIn(tempin);
                      } else {
                        let templi = [...comList];
                        templi[index] = true;
                        let tempin = [...comIn];
                        tempin[index] = true;
                        setComList(templi);
                        setComIn(tempin);
                      }
                    }}
                  >{`${arr.subcomment.length}${
                    arr.subcomment.length > 1 ? " Comments" : " Comment"
                  }`}</div>
                </div>

                <hr></hr>
                <div className="likeBox2">
                  <div
                    className="like2"
                    aria-disabled={true}
                    onClick={() => {
                      like(arr.userId, arr._id);
                    }}
                  >
                    {arr.likes.length > 0 &&
                    arr.likes.findIndex((ar) => {
                      return ar.likedBy === username;
                    }) !== -1 ? (
                      <>
                        <ThumbUpIcon className="colorBlue" />
                        <div className="colorBlue"> liked</div>
                      </>
                    ) : (
                      <>
                        <ThumbUpIcon /> <div> like</div>
                      </>
                    )}
                  </div>
                  <div
                    className="commentBox2"
                    onClick={() => {
                      if (comIn[index] === true) {
                        let tempin = [...comIn];
                        tempin[index] = false;
                        setComIn(tempin);
                      } else {
                        let tempin = [...comIn];
                        tempin[index] = true;
                        setComIn(tempin);
                      }
                    }}
                  >
                    <ChatBubbleOutlineIcon /> <div>Comment</div>
                  </div>
                </div>
                <hr></hr>
                {comList[index] ? (
                  <Subcomment subcomment={arr.subcomment} />
                ) : (
                  <></>
                )}

                {comIn[index] ? (
                  <>
                    <textarea
                      onChange={(e) => {
                        let temp = [...subInput];
                        temp[index] = e.target.value;
                        setSubInput(temp);
                      }}
                      className="commentInput new"
                      cols="40"
                      rows="1"
                      placeholder="Comment"
                      value={subInput[index]}
                    ></textarea>
                    <button
                      onClick={(e) =>
                        postSubComment(e, index, arr._id, arr.userId)
                      }
                      value="Submit"
                      className="commentButton new"
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </form>
              {likearr.length > 0 && <Likelist ar={likearr} list={likeList} />}
            </>
          );
        })}
    </div>
  );
}

export default Comment;
