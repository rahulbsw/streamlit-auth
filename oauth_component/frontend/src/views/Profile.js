import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useAuth ,withAuth} from  "react-oauth2-pkce";

export const ProfileComponent = () => {
  const { user } = useAuth();

  return (
    <Container className="mb-5">
    </Container>
  );
};

export default withAuth(ProfileComponent, {
  onRedirecting: () => <div />,
});
