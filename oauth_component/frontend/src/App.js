import React from "react";
import { Router } from "react-router-dom";
import { AuthProvider ,AuthService } from "react-oauth2-pkce" ;



import NavBar from "./components/NavBar";
import history from "./utils/history";
import {
  Button,
} from "reactstrap";

import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
var _ = require('lodash');

initFontAwesome();
class App extends StreamlitComponentBase {

  constructor(props){
    super(props)
    this.state = { user: null };
  }

  onRun = (user) => {
    if (! _.isEqual(user, this.state.user)){        
          if (! user){
            Streamlit.setComponentValue(user)
            this.setState({user: user})
          }

          else {
            user['token']().then(
              (token) => {
                user['token'] = token;
                Streamlit.setComponentValue(user)
                this.setState({user: user})
              }
            )
          }
      } 
  }

  authService = new AuthService({
              clientId: this.props['args']['auth_setup']['clientId'],
              clientSecret: this.props['args']['auth_setup']['clientSecret'],
              location: window.location,
              provider: this.props['args']['auth_setup']['provider'],
              redirectUri: window.location.origin,
              scopes: ['openid', 'profile'] //this.props['args']['auth_setup']['scope'],
        });


  render(){
    return (
    <AuthProvider authService={this.authService}>
        <div id="app" >
          <NavBar props = {{onRun : this.onRun,authority : this.props['args']['auth_setup']['provider']}} />
        </div>
      </AuthProvider>
    );
  }}

// export default App;
export default withStreamlitConnection(App)


