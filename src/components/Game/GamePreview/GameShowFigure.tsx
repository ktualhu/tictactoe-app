import { Row, Col, Button } from 'react-bootstrap';

type GameShowFigureProps = {
  figure: string;
};

const GameShowFigure = (props: GameShowFigureProps) => (
  <Col>
    <Row className="justify-content-md-center mb-3">
      <h4 className="display-4" style={{ fontSize: '1.5rem' }}>
        Your figure is <span className="font-weight-bold">{props.figure}</span>
      </h4>
    </Row>
    <Row className="justify-content-md-center">
      <Button type="submit" variant="info" className="btn-lg">
        OK
      </Button>
    </Row>
  </Col>
);

export default GameShowFigure;
