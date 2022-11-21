import React, { useState } from "react";
import axios from "../server";
import avatar from "../images/avatar.svg";
import CircularProgress from "@mui/material/CircularProgress";
function Profile({ fetch, username, firstname, lastname, img, hideButton }) {
  const [image, setImage] = useState(img);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
      await axios.post("/postProfilePic", {
        username,
        image: fileReader.result,
      });
      await fetch();
      setLoading(false);
      setImage(fileReader.result);
    };
  };
  return (
    <div className="profile">
      {loading && <CircularProgress className="loading" />}
      <div className="profileHead">
        <img
          style={{ width: "56%", margin: "auto" }}
          src={image ? image : avatar}
          alt=""
        />
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            bottom: "-8vw",
            left: "calc(50% - 5.5vw)",
          }}
        >
          <div className="profileLogo">{firstname[0]}</div>
          {/* <div className="profileUsername">{username}</div> */}
        </div>
      </div>
      <div
        className="input"
        style={hideButton ? { display: "none" } : { display: "block" }}
      >
        <input
          onChange={(e) => handleFileUpload(e)}
          type="file"
          name="upload_file"
          accept="image/*"
          id="file"
        />
        <label htmlFor="file">Upload Profile image</label>
      </div>
      <hr></hr>
      <div className="profileName">{`Firstname: ${firstname}`}</div>

      <div className="profileName">{`Lastname: ${lastname}`}</div>
    </div>
  );
}

export default Profile;
