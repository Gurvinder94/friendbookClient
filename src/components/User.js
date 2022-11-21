import React from "react";
import Header from "./Header";
import Profile from "./Profile";
import List from "./List";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../server";
import { useNavigate } from "react-router-dom";

function User() {
  const [tempAuth, setTempIsAuth] = useState({});
  const [isHomepage, setIsHomepage] = useState(true);
  const [list, setlist] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetch = async () => {
    let res = await axios.get("/isAuthenticate");
    if (res.data === "not logged in") {
      navigate("/login");
    }
    setData(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const addLike = (postId) => {
    let res = [...data.comment];
    for (let i = 0; i < res.length; i++) {
      if (res[i]._id === postId) {
        let obj = {
          likedBy: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
        };

        let index = res[i].likes.findIndex((ar) => {
          return ar.likedBy === data.username;
        });
        if (index === -1) {
          res[i].likes.push(obj);
        } else {
          res[i].likes.splice(index, 1);
        }
        setData({ ...data, comment: res });
        break;
      }
    }
  };

  const handleView = async (view, value = null, input = "") => {
    if (view === "profile1") {
      let temp = {
        username: value.username,
        firstname: value.firstname,
        lastname: value.lastname,
        img: value.img,
      };
      if (data.username !== value.username) {
        temp.hideButton = true;
      }
      setTempIsAuth(temp);
      setIsHomepage(false);
    } else if (view === "profile") {
      let temp = { ...data };
      let img = temp.profilePic;
      delete temp.profilePic;
      temp.img = img;
      setTempIsAuth(temp);
      setIsHomepage(false);
    } else if (view === "homepage") {
      setIsHomepage(true);
    } else if (view === "search") {
      setLoading(true);
      let result = await axios.post("/search", { query: input });
      setlist(result.data);
      setIsHomepage(1);
      setLoading(false);
    } else if (view === "friend") {
      setLoading(true);
      let result = await axios.post("/search", { query: input });
      setlist(result.data);
      setIsHomepage(2);
      setLoading(false);
    }
  };
  return (
    <div>
      {!data && <CircularProgress className="loading" />}
      {loading && <CircularProgress className="loading" />}
      {data && (
        <div>
          <Header
            handleView={handleView}
            firstname={data.firstname}
            lastname={data.lastname}
            img={data.profilePic}
          />
          {isHomepage === true && (
            <Comment
              fetch={fetch}
              addLike={addLike}
              firstname={data.firstname}
              lastname={data.lastname}
              username={data.username}
              posts={data.comment}
              _id={data._id}
            />
          )}
          {isHomepage === false && (
            <Profile
              fetch={fetch}
              username={tempAuth.username}
              firstname={tempAuth.firstname}
              lastname={tempAuth.lastname}
              img={tempAuth.img}
              hideButton={tempAuth.hideButton}
            />
          )}
          {isHomepage === 1 && (
            <List
              list={list}
              username={data.username}
              handleView={handleView}
            />
          )}
          {isHomepage === 2 && (
            <List
              list={list}
              username={data.username}
              handleView={handleView}
              friend={1}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default User;
