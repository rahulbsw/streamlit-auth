import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// styles
import "./NavBar.css";
// eslint-disable-next-line
import {
  Container,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import {
  Streamlit
} from "streamlit-component-lib"

// eslint-disable-next-line
import { useAuth } from "react-oidc-context";

const NavBar = (props) => {

  var onRun  = props['props']['onRun']
  var authority = props['props']['authority']

  // eslint-disable-next-line
  const {
    user,
    isAuthenticated,
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

  return (
    <div className="nav-container">
      <Container className="login-component">
            {!isAuthenticated && (
                <Button
                  color="primary"
                  className="btn-margin"
                  onClick={() => {
                      signinPopup({popup_redirect_uri: window.location.origin}).then(()=>{onRun(false)})
                }}
                >
                  Log in
                </Button>
            )}
            {isAuthenticated && (
                <Button
                onClick={() => {
                    logoutWithRedirect()
                  }}
                >Logout
                </Button>
            )}
      </Container>
    </div>
  );
};

export default NavBar;