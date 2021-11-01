import AppFooter from "./app.footer";
import AppHeader from "./app.header";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import RegisterContainer from "../register/register";
import SplashContainer from "../splash/splash";
import RestaurantsContainers from "../restaurants/restaurants";
import RestaurantDetailContainer from "../restaurant.detail/restaurant.detail";

const StyledAppMain = styled.div`
  width: 1024px;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;

  .crt-content {
    flex-grow: 1;

    h3 {
      font-size: 24px;
      display: block;
      padding: 8px 0px;
      text-align: center;
      margin: 32px 64px;
      font-weight: 300;
    }
    img {
      width: 100%;
    }
    ul {
      list-style: none;
      li {
        display: inline;
      }
    }
    > button {
      padding: 8px 16px;
      margin: 32px 64px;
      color: white;
    }
  }
`;

function AppMain() {

  
  

  const logoCliked = () => {
    console.log("Se hizo click en el logo");
  };

  return (
    <StyledAppMain>
      <AppHeader
        onLogoClick={logoCliked}
        showLogo={true}
        
      />

      <div className="crt-content">
        <Switch>
        <Route path="/restaurants/:id">
            <RestaurantDetailContainer />
          </Route>
            <Route path="/restaurants">
            <RestaurantsContainers />
          </Route>
            <Route path="/register">
            <RegisterContainer />
          </Route>
          <Route path="/">
           <SplashContainer  />
          </Route>
        </Switch>
      </div>

      <AppFooter />
    </StyledAppMain>
  );
}

export default AppMain;
