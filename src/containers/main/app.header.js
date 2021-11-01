import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import styled from "styled-components";
import logo from "../../app/images/logo.png";
import { People, Restaurant } from "@material-ui/icons";
import { CRITIC_PALETTE } from "../../app/themes/themes";
import AppUser from "./app.user";
import { CriticStore } from "../../app/store/store";
import { useHistory } from "react-router";

const StyledAppHeader = styled.div`
  width: 100%;
  height: 64px;
  text-align: left;
  display: flex;

  .crt-logo {
    height: 48px;
    margin-top: 8px;
  }

  ul {
    display: inline-block;
    flex-grow: 1;
    text-align: right;

    li {
      font-size: 20px;
      display: inline-block;
      margin-left: 32px;
      line-height: 30px;

      button{
          font-size:16px;
          color:${CRITIC_PALETTE.light}
      }
    }
  }

  .crt-user {
    width: 240px;
    position: relative;
    text-align: right;
    padding-right: 8px;

    h4 {
     font-size: 14px;
    }
    h5 {
        font-size: 12px;

    }
    
  }
`;

function AppHeader({ showLogo, onLogoClick}) {
  const {state}= useContext(CriticStore)
  const{googleUser} = state
  const {history}= useHistory()

  const internalClick = () => {
    console.log("Se hizo click internamente");
    onLogoClick();
  };

  

  return (
    <StyledAppHeader>
      <AppBar position="relative">
        <Toolbar>
          {showLogo && (
            <img
              className="crt-logo"
              src={logo}
              alt="logo"
              onClick={internalClick}
            ></img>
          )}
          <ul>
            <li>
              <IconButton >
                <Restaurant  />

                <span >Restaurants</span>
              </IconButton>
              <IconButton>
                <People />

                <span>Users</span>
              </IconButton>
            </li>
          </ul>

          {googleUser && 
              <>
            <div className="crt-user">
            <Typography variant="h4">{googleUser.name}</Typography>
            <Typography variant="h5">{googleUser.email}</Typography>
            </div>
            <AppUser/>
            </>

          }
        </Toolbar>
      </AppBar>
    </StyledAppHeader>
  );
}

export default AppHeader;
