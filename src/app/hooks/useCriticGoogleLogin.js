import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../env";
import { apiService } from "../services/apiService";
import { CriticDispachers } from "../store/store";
import { useContext } from 'react';


export default function useCriticGoogleLogin({
    onUserFound = ()=>{},
    onUserNotFound = ()=> {},
    onLogout = ()=> {}
}){

    const {dispatch} = useContext(CriticDispachers)

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
              onUserFound()              })
            .catch(()=> onUserNotFound())

    } 

    const onLogoutSuccess = (res) => {
        dispatch(CriticDispachers.logout())
        onLogout()      };
    
      //Copiamos elo hook que aparece en React login hook y nos quedamos solo con los apartados onSucces, clientId y onFalure
      
      
    
      const { signOut } = useGoogleLogout({
        onFailure,
        clientId: GOOGLE_CLIENT_ID,
        onLogoutSuccess,
      });
    
    return {signIn,signOut}
}