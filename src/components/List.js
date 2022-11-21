import React, { useState, useEffect } from "react";
import Confirm from "./Confirm";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../server";

function List({ list, username, handleView, friend }) {
  const [arr, setArr] = useState([]);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    let temp = [];
    list.map((arr, index) => {
      let pause = 0;
      if (friend !== 1) {
        if (arr.username === username) {
          arr.status = "friend";
          temp = [arr, ...temp];
          pause = 1;
        }
        if (pause === 0) {
          arr.friend.map((sm) => {
            if (sm.username === username) {
              arr.status = "friend";
              temp[index] = arr;
              pause = 1;
            }
          });
        }
        if (pause === 0) {
          arr.pending.map((sm) => {
            if (sm.username === username) {
              arr.status = "sent";
              temp = [...temp, arr];
              pause = 1;
            }
          });
        }
        if (pause === 0) {
          arr.sentRequest.map((sm) => {
            if (sm.username === username) {
              arr.status = "pending";
              temp = [...temp, arr];
              pause = 1;
            }
          });
        }
        if (pause === 0) {
          arr.status = "user";
          temp = [...temp, arr];
        }
      }

      if (friend === 1) {
        if (pause === 0) {
          arr.friend.map((sm) => {
            if (sm.username === username) {
              arr.status = "friend";
              temp = [arr, ...temp];
              pause = 1;
            }
          });
        }
      }
    });
    setArr(temp);
  }, [list]);

  const request = (status, self, third) => {
    axios.post("/friend", { status, self, third });
  };

  return (
    <div className="list">
      {/* {loading && <CircularProgress className="loading" />} */}
      {arr.length === 0 ? (
        <div>
          {/* {loading === false && ( */}
          <div className="profileName">No Friends to show!</div>
          {/* )} */}
        </div>
      ) : (
        arr.map((ar, index) => {
          if (friend === 1 && ar.username === username) {
            return;
          }
          if ((friend === 1 && ar.status === "friend") || friend !== 1) {
            return (
              <div className="listHead" key={index}>
                <div className="listLogo">{ar.firstname[0].toUpperCase()}</div>
                <div className="listName">
                  <div className="listFname">
                    {ar.firstname + " " + ar.lastname}
                  </div>
                  <div className="listUname">{ar.username}</div>
                </div>
                <div className="listIcon">
                  <div className="listicon">
                    {ar.status === "friend" && (
                      <AccountCircle
                        className="cursor"
                        onClick={() => {
                          handleView("profile1", {
                            firstname: ar.firstname,
                            lastname: ar.lastname,
                            username: ar.username,
                            img: ar.profilePic,
                          });
                        }}
                      />
                    )}
                    {ar.status === "pending" && (
                      <Confirm
                        onclick={() => {
                          request("confirm", username, ar.username);

                          let temp = [...arr];
                          let tempVal = { ...arr[index] };
                          tempVal.status = "friend";
                          temp.splice(index, 1, tempVal);
                          setArr(temp);
                        }}
                        status={"Confirm Request"}
                      />
                    )}
                    {ar.status === "sent" && <Confirm status={"Requested"} />}
                    {ar.status === "user" && (
                      <PersonAddIcon
                        className="cursor"
                        onClick={() => {
                          request("sent", username, ar.username);

                          let temp = [...arr];
                          let tempVal = { ...arr[index] };
                          tempVal.status = "sent";
                          temp.splice(index, 1, tempVal);
                          setArr(temp);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
}

export default List;
