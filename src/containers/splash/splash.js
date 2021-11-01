import styled from "styled-components";
import { Button, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useGoogleLogin } from "react-google-login";
import homeImage from "../../app/images/home-image.jpg";
import { GOOGLE_CLIENT_ID } from "../../env";
import { useHistory } from "react-router-dom";
import { apiService } from "../../app/services/apiService";
import { CriticDispachers, CriticStore } from "../../app/store/store";



const StyledSplashContainer = styled.div`
 
`;

function SplashContainer() {
  const{dispatch} = useContext(CriticStore)
  let history = useHistory()

    const onSuccess = (res) => {
        console.log(res);
        dispatch(CriticDispachers.login(res.profileObj))
        checkUserExists(res.profileObj.email)
      };
      const onFailure = (res) => {
        console.log(res);
      };

    const { signIn } = useGoogleLogin({
        onSuccess,
        clientId: GOOGLE_CLIENT_ID,
        onFailure,
        isSignedIn:true
      });

    const checkUserExists = (email)=>{
        apiService.getAppUserByEmail(email)
            .then((appUser)=>{
              dispatch(CriticDispachers.setAppUser(appUser))
               history.push('/restaurants')
              })
            .catch(()=> history.push('/register'))

    }  
     
    return (
        <div>
            <StyledSplashContainer>
            <Typography variant="h3">
              Welcome to Critic, the leading world site for restaurant rewiews
            </Typography>
            <img src={homeImage} alt="homeImage" />
            <Button variant="contained" color="primary" onClick={signIn}>
              Login
            </Button>
            </StyledSplashContainer>
        </div>
    );
}

export default SplashContainer;