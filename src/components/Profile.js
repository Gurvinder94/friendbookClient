import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../server";

function Profile() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const fetch = async () => {
    return await axios.get("/isAuthenticate", { withCredentials: true });
  };
  useEffect(() => {
    fetch().then((res) => {
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
