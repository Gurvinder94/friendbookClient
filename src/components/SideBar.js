import React from "react";
import avatar from "../images/avatar.svg";
import friend from "../images/friend.png";
import logoutt from "../images/logout.png";

function SideBar({ handleView, logout, firstname, lastname, img }) {
  return (
    <div className="bar">
      <div
        className="barHead"
        onClick={() => {
          handleView("profile");
        }}
      >
        <img src={img ? img : avatar} alt="" />
        <div>{firstname + " " + lastname}</div>
      </div>
      <div
        className="barFriend"
        onClick={() => {
          handleView("friend");
        }}
      >
        <img src={friend} alt="" />
        Friends
      </div>
      <div className="barLogout" onClick={logout}>
        <img src={logoutt} alt="" />
        Logout
      </div>
      <div></div>
    </div>
  );
}

export default SideBar;
