import { Container, Row, Col } from 'react-bootstrap';
import { Route, RouteComponentProps } from 'react-router';

interface IProps {
  route: RouteComponentProps;
}

function NotFound(props: IProps) {
  return (
    <Container className="h-100 d-flex justify-content-center text-white">
      <Row className="justify-content-center align-items-center">
        <Col className="p-5 bg-dark rounded">
          <p className="fs-1">404 Not Found</p>
          {/* <p className="fs-3">{props.route.history.location.state.}</p> */}
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
