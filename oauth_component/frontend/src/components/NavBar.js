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
import { useAuth } from 'react-oauth2-pkce';

const NavBar = (props) => {

  var onRun  = props['props']['onRun']
  var authority = props['props']['authority']

  // eslint-disable-next-line
  const {
   authService,
   authTokens
  } = useAuth();

  const login = async () => {
    authService.authorize()
  }
  const logout = async () => {
    authService.logout()
  }

  if (authService.isAuthenticated){
        const token = authTokens?.access_token
        authTokens['token'] = token;
        onRun(authTokens);
  }else{
        onRun(false)
  }

  return (
    <div className="nav-container">
      <Container className="login-component">
            {!authService.isAuthenticated && (
                <Button
                  color="primary"
                  className="btn-margin"
                  onClick={() => {
                      login().then(()=>{onRun(false)})
                }}
                >
                  Log in
                </Button>
            )}
            {authService.isAuthenticated && (
                <Button
                onClick={logout}
                >Logout
                </Button>
            )}
      </Container>
    </div>
  );
};

export default NavBar;