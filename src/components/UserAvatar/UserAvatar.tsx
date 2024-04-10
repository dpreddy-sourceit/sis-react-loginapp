import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../store/app/appSlice";

const UserAvatar = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const moveToProfile = async () => {
    // fire api to get the user profile data;
    // save it to the redux;
    let user = AuthService.getCurrentUser();
    const userDetails = await UserService.getUserDetails(
      user.email,
      "myprofile"
    );
    dispatch(setUserProfile(userDetails));
    navigate("/profile");
    setAnchorEl(null);
  };

  const moveBackToLogin = () => {
    AuthService.logout();
    navigate("/login");
    setAnchorEl(null);
    window.location.reload();
  };

  return (
    <div>
      <IconButton
        aria-label="user account"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle
          fontSize="large"
          style={{
            color: "white",
          }}
        />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        variant={"menu"}
      >
        <MenuItem onClick={moveToProfile}>My Profile</MenuItem>
        <MenuItem onClick={moveBackToLogin}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserAvatar;
