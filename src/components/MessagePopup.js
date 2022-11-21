import React from "react";
import avatar from "../images/avatar.svg";
import chat from "../images/chat.png";
const data = [
  {
    firstname: "Abc",
    lastname: "abc",
    text: "Lorem, ipsum dolor sit amet consectetura pariatur dicta corporis assumenda minima alias impedit.",
  },
  {
    firstname: "Abc2",
    lastname: "abc2",
    text: "Lorem, ipsum dolor sit amet consectetura pariatur dicta corporis assumenda minima alias impedit.",
  },
];

function MessagePopup({ popup }) {
  return (
    <div
      className="msg"
      style={popup ? { display: "block" } : { display: "none" }}
    >
      <div className="msgHead">
        Messenger{" "}
        <img
          style={{ width: "31px", height: "31px", alignSelf: "center" }}
          src={chat}
          alt=""
        />
      </div>
      {data.map((arr, index) => {
        return (
          <div key={index} className="msgCont">
            <div className="msgImg">
              <img src={avatar} alt="" />
            </div>
            <div className="msgMiniCont">
              <div className="msgName">{arr.firstname + arr.lastname}</div>
              <div className="msgTxtCont">
                <div className="msgTxt">{arr.text}</div>
                <div
                  style={{
                    color: "rgb(5, 5, 5)",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "10px",
                  }}
                >
                  .
                </div>
                <div className="time">1w</div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgb(24, 118, 242)",
                borderRadius: "50%",
                height: "12px",
                width: "12px",
                marginLeft: "16px",
                marginTop: "24px",
              }}
            ></div>
          </div>
        );
      })}
      <hr style={{ color: "#e7e9ec36", margin: "29px" }} />
    </div>
  );
}

export default MessagePopup;
