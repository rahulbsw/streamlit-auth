import os
import streamlit.components.v1 as components

_RELEASE = False
_RELEASE = True

if not _RELEASE:
    _login_button = components.declare_component(
        "login_button",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _login_button = components.declare_component("login_button", path=build_dir)

import json
from six.moves.urllib.request import urlopen
from functools import wraps
from jose import jwt

# def getVerifiedSubFromToken(token, authority):
#     if not authority :
#         print('discoveryUrl cannot be null!')
#         raise ValueError
#     jsonurl = urlopen(authority)
#     jwks = json.loads(jsonurl.read())
#     unverified_header = jwt.get_unverified_header(token)
#     rsa_key = {}
#     for key in jwks["keys"]:
#         if key["kid"] == unverified_header["kid"]:
#             rsa_key = {
#                 "kty": key["kty"],
#                 "kid": key["kid"],
#                 "use": key["use"],
#                 "n": key["n"],
#                 "e": key["e"]
#             }
#     if rsa_key:
#         try:
#             payload = jwt.decode(
#                 token,
#                 rsa_key,
#                 algorithms=["RS256"],
#                 audience=domain+"/api/v2/",
#                 issuer=domain+'/'
#             )
#         except jwt.ExpiredSignatureError:
#             raise
#         except jwt.JWTClaimsError:
#             raise
#         except Exception:
#             raise
#
#         return payload['sub']

def login_button(clientId,clientSecret, provider,scope,key="oauth2-auth", **kwargs):
    """Create a new instance of "login_button".

    Parameters
    ----------
    clientId: str
        client_id per oauth2 config on your Applications
    
    clientSecret: str
        clientSecret per oauth2 config on your Applications

    provider:str
        authority/issuer per oauth2 config on your Applications

    scope:str
        scope per oauth2 config on your Applications

    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    dict
        User info

    """
    user_info = _login_button(auth_setup = {'clientId': clientId,
                                            "clientSecret": clientSecret,
                                            "provider" : provider,
                                            "scope" :scope
                                            },
                              key=key,
                              default=0)
    if not user_info:
        return False
    elif isAuth(response = user_info, provider = provider):
        return user_info
    else:
        print('Auth failed: invalid token')
        raise 

def isAuth(response,provider):
    if (response!=None and response['token']!=None):
        return True
    else:
        return False


if not _RELEASE:
    import streamlit as st
    from dotenv import load_dotenv
    import os
    load_dotenv()

    provider = os.environ['provider']  # 'https://oidc.io/oauth',
    clientId = os.environ['clientId']
    clientSecret = os.environ['clientSecret']
    scope = os.environ['scope']
    st.subheader("Login component")
    user_info = login_button(clientId,clientSecret, provider , scope)
    # user_info = login_button(clientId = "...", domain = "...")
    st.write('User info')
    st.write(user_info)
    if st.button('rerun'):
        st.experimental_rerun()