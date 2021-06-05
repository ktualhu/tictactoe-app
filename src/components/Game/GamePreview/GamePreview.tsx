import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from '../Game.module.css';

type GamePreviewProps = {
  handleGameStart: (figure: string) => void;
};

function GamePreview(props: GamePreviewProps) {
  return (
    <Container className={`bg-white text-dark ${styles.table}`}>
      <Row style={{ height: '10%' }}>
        <Col className="d-flex justify-content-center">
          <h1>Choose Your Figure</h1>
        </Col>
      </Row>
      <Row className="text-white" style={{ height: '80%' }}>
        <Col className="align-self-center mr-3 ml-3">
          <Button
            variant="dark"
            className={styles.cell}
            onClick={() => props.handleGameStart('X')}
          >
            <h1 className="display-3">X</h1>
          </Button>
        </Col>
        <Col className="align-self-center mr-3 ml-3">
          <Button
            variant="dark"
            className={styles.cell}
            onClick={() => props.handleGameStart('0')}
          >
            <h1 className="display-3">0</h1>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default GamePreview;
