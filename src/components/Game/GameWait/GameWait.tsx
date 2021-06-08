import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../../UI/Loader/Loader';

function GameWait() {
  return (
    <Container className="d-flex align-items-center" style={{ height: '90%' }}>
      <Col>
        <Row className="justify-content-md-center">
          <Loader />
        </Row>
        <Row className="justify-content-md-center">
          <h4 className="display-4" style={{ fontSize: '1.5rem' }}>
            Waiting for one more player
          </h4>
        </Row>
      </Col>
    </Container>
  );
}

export default GameWait;
