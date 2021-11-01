import { Avatar, Menu, MenuItem } from "@material-ui/core";
import React, { useContext } from "react";
import { useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CriticDispachers, CriticStore } from "../../app/store/store";
import { GOOGLE_CLIENT_ID } from "../../env";


//Implementamos el login de Google con React login hook de NPM./////////////////////////////////////////////////

const StyledAppUser = styled.div``;

function AppUser() {
  const{state,dispatch} = useContext(CriticStore)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {googleUser} = state
  let history = useHistory()

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose()
    signOut()
  }
  const onLogoutSuccess = (res) => {
    dispatch(CriticDispachers.logout())
    history.push("/")
  };

  //Copiamos elo hook que aparece en React login hook y nos quedamos solo con los apartados onSucces, clientId y onFalure
  const onFailure = (res) => {
    console.log(res);
  };
  

  const { signOut } = useGoogleLogout({
    onFailure,
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess,
  });



  return (
    <StyledAppUser>
      <Avatar src={googleUser.imageUrl} alt="user" onClick={handleClick}></Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
      
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </StyledAppUser>
  );
}

export default AppUser;
