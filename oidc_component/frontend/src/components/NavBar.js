import React from "react";
// styles
import "./NavBar.css";
// eslint-disable-next-line
import {
  Container,
  Button,
} from "reactstrap";


// eslint-disable-next-line
import { useAuth } from "react-oidc-context";

const NavBar = (props) => {

  var onRun  = props['props']['onRun']
  var authority = props['props']['authority']

  // eslint-disable-next-line
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    removeUser,
    signinRedirect,
    signinPopup,
    signoutRedirect
  } = useAuth();

  const logoutWithRedirect = () =>
    signoutRedirect({
      returnTo: window.location.origin,
    });

//  const getAccessToken = () => {
//    return getAccessTokenSilently({
//    // return getAccessTokenWithPopup({
//      audience:`https://${domain}/api/v2/`,
//      scope: "read:current_user",
//    })
//  }


  if (isAuthenticated){
        const token = user?.access_token
        user['token'] = token;
        onRun(user);
  }else{
        onRun(false)
  }

   function show() {
   
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Oops... {error.message}</div>
    }

    if (isAuthenticated) {
        return (
            <div>
                Hello {user?.profile.sub}{" "}
                <button onClick={removeUser}>
                    Log out
                </button>
            </div>
        )
    }

    return <button onClick={signinRedirect}>Log in</button>
}
  return (
    <div className="nav-container">
      <Container className="login-component">
            {show()}
      </Container>
    </div>
  );
};

export default NavBar;