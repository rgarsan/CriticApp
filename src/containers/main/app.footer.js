import { AppBar, Toolbar, Typography } from "@material-ui/core"
import styled from "styled-components"


const StyledAppFooter = styled.div `

width: 100%;
height: 64px;
margin-top: 160px;

h6{
    text-align: center;
    font-size: 12px;
    display: inline-block;
    width: 100%;


}


`



function AppFooter() {
    return (
        <StyledAppFooter >   
        <AppBar position="relative">
        <Toolbar>
             <Typography variant="h6">Copyright Rafael García Sánchez 2021</Typography>
        </Toolbar> 
        </AppBar>  
       
        </StyledAppFooter>
    );
  }
  
  export default AppFooter;