import { useState } from 'react';

export const useGameLogic = () => {
  const fieldArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const [cells, setCells] = useState({} as NodeListOf<Element>);
  const [field, setField] = useState([] as string[]);
  const [figure, setFigure] = useState('');
  let winStrickFigures: number[] = [];

  const init = (paramCells: NodeListOf<Element>, fig: string) => {
    paramCells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('cannotuse');
    });
    setField(field => field.map((_, i) => (field[i] = '')));
    setFigure(fig);
    setCells(paramCells);
  };

  const fillCell = (cell: Element) => {
    const cellId = cell.id;
    let index = 0;
    switch (cellId.slice(0, 1)) {
      case '0':
        index++;
        break;
      case '1':
        index += 4;
        break;
      case '2':
        index += 7;
        break;
    }

    index += +cellId.slice(1);
    if (field[index]) return;
    const newField = field.slice();
    newField[index] = figure;
    setField(newField);
    cell.classList.add('cannotuse');
    cell.innerHTML = figure;
    return cell;
  };

  const checkWinner = function () {
    if (checkHorVert() || checkDiag()) {
      return true;
    } else {
      setFigure(figure === 'X' ? '0' : 'X');
      return false;
    }
  };

  const checkHorVert = function () {
    let vertStrick = 0;
    let horStrick = 0;
    let horWinStrickFigures: number[] = [];
    let vertWinStrickFigures: number[] = [];
    for (let i = 0; i < 3; i++) {
      vertStrick = 0;
      for (let j = 0; j < 3; j++) {
        if (cells[fieldArr[i][j] - 1].textContent === figure) {
          horStrick++;
          horWinStrickFigures.push(fieldArr[i][j] - 1);
        } else {
          horStrick = 0;
          horWinStrickFigures = [];
        }
        if (cells[fieldArr[j][i] - 1].textContent === figure) {
          vertStrick++;
          vertWinStrickFigures.push(fieldArr[j][i] - 1);
        } else {
          vertStrick = 0;
          vertWinStrickFigures = [];
        }
      }
      if (vertStrick === 3 || horStrick === 3) {
        horWinStrickFigures.length === 3
          ? (winStrickFigures = horWinStrickFigures)
          : (winStrickFigures = vertWinStrickFigures);
        break;
      }
    }
    return vertStrick === 3 || horStrick === 3;
  };

  const checkDiag = function () {
    let diagStrick = 0;
    let diagWinStrickFigures: number[] = [];
    for (let i = 0; i < 3; i++) {
      if (cells[fieldArr[i][i] - 1].textContent === figure) {
        diagWinStrickFigures.push(fieldArr[i][i] - 1);
        diagStrick++;
        continue;
      }
      if (i === 0) {
        for (let j = 2; j >= 0; j--) {
          if (cells[fieldArr[i][j] - 1].textContent === figure) {
            diagWinStrickFigures.push(fieldArr[i][j] - 1);
            i++;
            diagStrick++;
          } else {
            diagStrick = 0;
            diagWinStrickFigures = [];
            break;
          }
        }
      }
    }
    if (diagWinStrickFigures.length === 3)
      winStrickFigures = diagWinStrickFigures;
    return diagStrick === 3;
  };

  const getWinStrick = () => {
    return winStrickFigures;
  };

  return { init, fillCell, checkWinner, getWinStrick };
};
