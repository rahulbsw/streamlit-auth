import React from "react";
import { Router } from "react-router-dom";
import { AuthProvider } from "react-oidc-context" ;
import { useAuth } from "react-oidc-context";



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

  oidcConfig = {
      onSignIn: async (user) => {
        alert('You just signed in, congratz! Check out the console!');
        console.log(user);
        //window.location.hash = '';
      },
       authority: this.props['args']['auth_setup']['authority'],
       clientId: this.props['args']['auth_setup']['clientId'],
       clientSecret: this.props['args']['auth_setup']['clientSecret'],
       scope: this.props['args']['auth_setup']['scope'],
      responseType: 'id_token',
      redirectUri: window.location.origin,
    };


  render(){
    return (
    <AuthProvider {...this.oidcConfig}>
        <div id="app" >
          <NavBar props = {{onRun : this.onRun,authority : this.props['args']['auth_setup']['authority']}} />
        </div>
      </AuthProvider>
    );
  }}

// export default App;
export default withStreamlitConnection(App)


