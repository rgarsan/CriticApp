import styled from "styled-components";
import React, { useContext } from "react";
import { Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import clientImage from "../../../src/app/images/restaurantClient.jpg"
import ownerImage from "../../../src/app/images/restaurantOwner.jpg"
import { CRITIC_PALETTE } from "../../app/themes/themes";
import { apiService, ROLES } from "../../app/services/apiService";
import { useHistory } from "react-router";
import { CriticDispachers, CriticStore } from "../../app/store/store";


const StyledRegisterContainer = styled.div`
h3{
    margin-top: 128px;
    text-align: center;
}
.crt-register-card{
    cursor: pointer;
    &:hover{
        box-shadow: ${CRITIC_PALETTE.secondary} 0px 0px 8px 0px
    }
    width: 30%;
    margin-top: 40px;
    margin-left: 70px;
    margin-bottom: 150px;
    
}
span{
    width: 100%;
    padding-bottom: 10px;
}




`;

function RegisterContainer() {
  const{state,dispatch} = useContext(CriticStore)
  const{googleUser}= state


    let history = useHistory()

    const registerAppUser = (role)=>{
       const appUser={
            name:googleUser.name,
            email:googleUser.email,
            image:googleUser.imageUrl,
            role:role
        }
        apiService.createAppUser(appUser).then( () => {
          dispatch(CriticDispachers.setAppUser(appUser))
          history.push("/restaurants")
        })

    }
  return (
    <div>
      <StyledRegisterContainer>
      <Typography variant="h3">Please select your role in the application</Typography>
        <Grid container spacing={6}>
          <Grid item xs={1}></Grid>
          <Card className="crt-register-card" onClick={()=> registerAppUser(ROLES.USER)}>
            <CardContent>
                <img src={clientImage} alt="clientImage"/>
            </CardContent>
            <CardActions>
            <Typography variant="bubtitle1" >I am a restaurant customer</Typography>
            </CardActions>
          </Card>
          <Grid item xs={1}></Grid>
          <Card className="crt-register-card" onClick={()=>registerAppUser(ROLES.OWNER) }>
            <CardContent>
                <img src={ownerImage} alt="clientImage"/>
            </CardContent>
            <CardActions >
            <Typography variant="bubtitle1">I am a restaurant owner</Typography>
            </CardActions>
          </Card>
        </Grid>
      </StyledRegisterContainer>
    </div>
  );
}

export default RegisterContainer;
