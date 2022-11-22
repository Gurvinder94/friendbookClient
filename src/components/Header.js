import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import GroupIcon from "@mui/icons-material/Group";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MessagePopup from "./MessagePopup.js";
import SideBar from "./SideBar.js";
import axios from "../server";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar({
  handleView,
  firstname,
  lastname,
  img,
}) {
  const [sideBar, setSideBar] = useState(true);
  const [popup, setPopup] = useState(false);
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const mqChange = (mq) => {
    if (mq.matches === false) {
      setSideBar(true);
    }
  };
  const dqChange = (dq) => {
    if (dq.matches === false) {
      setSearch(false);
    }
  };
  useEffect(() => {
    let dq = window.matchMedia("screen and (max-width: 480px)");
    dq.addEventListener("change", dqChange);

    return () => {
      dq.removeEventListener("change", dqChange);
    };
  }, []);
  useEffect(() => {
    let mq = window.matchMedia("screen and (max-width: 640px)");
    mq.addEventListener("change", mqChange);

    return () => {
      mq.removeEventListener("change", mqChange);
    };
  }, []);

  const sidebar = () => {
    if (sideBar === true) {
      setSideBar(false);
    } else setSideBar(true);
  };
  const logout = async () => {
    await axios.post("/logout");
    navigate("/login");
    window.location.reload();
    setSideBar(true);
  };

  const handlePopup = () => {
    setPopup(!popup);
  };

  return (
    <div style={{ position: "sticky", zIndex: "1", top: "0" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className="moreiconmain"
              onClick={() => {
                setSideBar(true);
                handleView("homepage");
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
            <SideBar
              handleView={handleView}
              logout={logout}
              firstname={firstname}
              lastname={lastname}
              img={img}
            />
            <Typography
              className="cursor"
              onClick={() => {
                setSideBar(true);
                handleView("homepage");
              }}
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xxs: "none", sm: "block" } }}
            >
              Friendbook
            </Typography>
            <IconButton
              onClick={() => {
                setSearch(true);
              }}
              size="large"
              edge="end"
              color="inherit"
              className="searchicon"
            >
              <SearchIcon />
            </IconButton>
            <Search className={`searchbox ${search && "searchMini"}`}>
              <SearchIconWrapper
                className="cursor"
                onClick={() => {
                  setSearch(false);
                }}
              >
                <SearchIcon
                  onClick={() => {
                    setSideBar(true);
                    handleView("search", null, input);
                    setInput("");
                  }}
                />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              {search && (
                <CloseIcon
                  onClick={() => {
                    setSearch(false);
                  }}
                  className={`close cursor`}
                />
              )}
            </Search>

            <Box sx={{ flexGrow: 1, display: { xxs: "none", sm: "block" } }} />
            <Box sx={{ display: { xs: "block", md: "flex" } }}>
              <IconButton size="large" color="inherit" className="moreiconmain">
                <Badge color="error">
                  <GroupIcon
                    onClick={() => {
                      handleView("friend");
                    }}
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  handlePopup();
                }}
                className="moreiconmain"
              >
                <Badge color="error">
                  <CommentOutlinedIcon />
                </Badge>
              </IconButton>
              <MessagePopup popup={popup} />
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  handleView("profile");
                }}
                className="moreiconmain"
              >
                <Badge color="error">
                  <AccountCircle />
                </Badge>
              </IconButton>
              <IconButton
                onClick={logout}
                size="large"
                edge="end"
                aria-label="account of current user"
                color="inherit"
                className="moreiconmain"
              >
                <LogoutIcon />
              </IconButton>
              <IconButton
                onClick={sidebar}
                size="large"
                edge="end"
                color="inherit"
                className="moreicon"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={`sidebarbackground ${sideBar && "transparent"}`}>
        <div className={`sideBar ${sideBar && "translate"}`}>
          <div className="iconbox">
            <HomeIcon
              onClick={() => {
                setSideBar(true);
                handleView("homepage");
              }}
            />
          </div>
          <div className="iconbox">
            <GroupIcon
              onClick={() => {
                setSideBar(true);
                handleView("friend");
              }}
            />
          </div>
          <div className="iconbox">
            <AccountCircle
              onClick={() => {
                setSideBar(true);
                handleView("profile");
              }}
            />
          </div>
          <div className="iconbox">
            <LogoutIcon onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );
}
