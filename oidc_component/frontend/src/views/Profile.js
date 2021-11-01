import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useAuth ,withAuth} from 'react-oidc-context';

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
