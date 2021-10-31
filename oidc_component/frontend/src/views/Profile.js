import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useAuth ,withAuth} from 'oidc-react';

export const ProfileComponent = () => {
  const { user } = useAuth0();

  return (
    <Container className="mb-5">
    </Container>
  );
};

export default withAuth(ProfileComponent, {
  onRedirecting: () => <div />,
});
