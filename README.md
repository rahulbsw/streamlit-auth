# Welcome to Auth-Streamlit

**The fastest way to provide comprehensive login inside Streamlit**



## Installation
`pip install streamlit-auth-component`

## An example
* On OpenId website start a "Single Page Web Application" and copy your oidc properties from oidc provider.

```
from oidc_component import login_button
import streamlit as st

clientId = "...."
clientSecret = "...."
authority = "...."
scope = "...."

user_info = login_button(clientId=clientId,clientSecret=clientSecret, authority = authority,scope=scope)
st.write(user_info)
```

* On OAuth website start a "Single Page Web Application" and copy your OAuth properties from OAuth provider.

```
from oauth_component import login_button
import streamlit as st

clientId = "...."
clientSecret = "...."
provider = "...."
scope = "...."

user_info = login_button(clientId=clientId,clientSecret=clientSecret, provider = provider,scope=scope)
st.write(user_info)
```
`user_info` will now contain your user's information 

## Build Instruction
  
### Frontend build
```shell
 cd <SRC_HOME>/oidc_component/frontend
 # first time to install nodejs packages
 yarn install 
 yarn build
``` 
### Backend build
```shell
 cd <SRC_HOME>
 # first time to install nodejs packages
 python setup.py install
``` 
### Start Keycloak docker for ODIC provider (One time Setup)
```shell
  docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e DB_VENDOR=H2 -d --name keycloak quay.io/keycloak/keycloak:15.0.2
```
* Login to Keycloak http://localhost:8080/  (username/password: admin/admin)
* Import realm-export.json file
### Local Test
```shell
  streamlit run test.py  
```


## Todo

- Pass all info through JWT, at the moment the `sub` field is the only field assing through verification
- Test with other providers, only Google tested 