import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./NavBar.css";
import CloseIcon from "@material-ui/icons/Close";

const NavBar = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="nav-container">
      <div className="nav-bar">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={(e) => setOpen((curr) => !curr)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6">ClubHouse⛳️</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className={open ? "burger-open" : "burger-closed"}>
        <div className={open ? "burger-button-open" : "burger-button-closed"}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={(e) => setOpen((curr) => !curr)}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default NavBar;
