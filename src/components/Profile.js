import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../server";

function Profile() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const fetch1 = async () => {
    let res = await fetch(
      "https://friendbookserver.vercel.app/isAuthenticate",
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    console.log(res);

    let res2 = await res.json();
    console.log(res2);
    let a = { data: res2 };

    return a;

    // return await axios.get("/isAuthenticate", { withCredentials: true });
  };
  useEffect(() => {
    fetch1().then((res) => {
      console.log(res);
      if (res.data === "not logged in") {
        navigate("/login");
      }
      setData(res.data[0]);
    });
  }, []);
  if (!data) {
    return <div>loading</div>;
  }

  return (
    <div className="profile">
      <div className="profileHead">
        <div className="profileLogo">{data.firstname[0]}</div>
        <div className="profileUsername">{data.username}</div>
      </div>
      <hr></hr>
      <div className="profileName">{`Firstname: ${data.firstname}`}</div>

      <div className="profileName">{`Lastname: ${data.lastname}`}</div>
      <hr></hr>
    </div>
  );
}

export default Profile;
