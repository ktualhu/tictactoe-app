import { useEffect } from 'react';
import { Row, Col, Container, Table, Button } from 'react-bootstrap';
import { useGameLogic } from './GameLogic';
import './Game.css';

function Game() {
  const gameLogic = useGameLogic();

  useEffect(() => {
    gameLogic.init(document.querySelectorAll('.cell'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCellClick: React.MouseEventHandler<HTMLTableElement> = event => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.classList.contains('cell')) return;
    const el = gameLogic.fillCell(event.target)!;
    renderButtonText(el);
    if (gameLogic.checkWinner()) {
      paintWinner(gameLogic.getWinStrick());
    }
  };

  const paintWinner = (winCells: number[]) => {
    winCells.forEach(cellNum => {
      document
        .querySelectorAll('.cell')
        [cellNum].firstElementChild?.classList.add('winner');
    });
  };

  const renderButtonText = (el: Element) => {
    const h1 = document.createElement('h1');
    h1.setAttribute('className', 'display-3');
    h1.textContent = el.textContent;
    el.textContent = '';
    document
      .getElementById(`${el.id}`)
      ?.insertAdjacentElement('afterbegin', h1);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Game</h1>
        </Col>
      </Row>
      <Table
        className="table table-borderless table-sm"
        onClick={handleCellClick}
      >
        <tbody>
          <tr>
            <td>
              <Button variant="light" className="cell" id="00"></Button>
            </td>
            <td>
              <Button variant="light" className="cell" id="01"></Button>
            </td>
            <td>
              <Button variant="light" className="cell" id="02"></Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="light" className="cell" id="10"></Button>
            </td>
            <td>
              <Button variant="light" className="cell" id="11"></Button>
            </td>
            <td>
              <Button variant="light" className="cell" id="12"></Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="light" className="cell" id="20"></Button>
            </td>
            <td>
              <Button variant="light" className="cell" id="21"></Button>
            </td>
            <td>
              <Button variant="light" className="cell" id="22"></Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Game;
