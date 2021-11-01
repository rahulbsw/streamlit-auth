from oidc_component import login_button as oidc_button
from oauth_component import login_button as oauth_button
import streamlit as st
from dotenv import load_dotenv
import os
load_dotenv()

#provider=os.environ['provider']
authority = os.environ['authority'] # 'https://oidc.io/oauth',
clientId = os.environ['clientId']
clientSecret = os.environ['clientSecret']
scope = os.environ['scope']

st.title('Welcome to OIDC-Streamlit')


with st.echo():
    user_info = oidc_button(clientId=clientId , clientSecret=clientSecret, authority = authority ,scope=scope)
    #user_info = oauth_button(clientId=clientId, clientSecret=clientSecret, provider=provider, scope=scope)
    if user_info:
        st.write(f'Hi {user_info["nickname"]}')
        # st.write(user_info) # some private information here
        
if not user_info:
    st.write("Please login to continue")