import { Table, Button } from 'react-bootstrap';
import styles from '../Game.module.css';

type GameFieldProps = {
  handleCellClick: (
    event: React.MouseEvent<HTMLTableElement, MouseEvent>
  ) => void;
  disabled: boolean;
};

function GameField(props: GameFieldProps) {
  return (
    <Table
      className={`${styles.table} table-borderless table-sm`}
      onClick={props.handleCellClick}
    >
      <tbody>
        <tr>
          <td className={styles.td}>
            <Button
              disabled={props.disabled}
              variant="light"
              className={`${styles.cell} cell`}
              id="00"
            ></Button>
          </td>
          <td className={styles.td}>
            <Button
              disabled={props.disabled}
              variant="light"
              className={`${styles.cell} cell`}
              id="01"
            ></Button>
          </td>
          <td className={styles.td}>
            <Button
              disabled={props.disabled}
              variant="light"
              className={`${styles.cell} cell`}
              id="02"
            ></Button>
          </td>
        </tr>
        <tr>
          <td className={styles.td}>
            <Button
              disabled={props.disabled}
              variant="light"
              className={`${styles.cell} cell`}
              id="10"
            ></Button>
          </td>
          <td className={styles.td}>
            <Button
              disabled={props.disabled}
              variant="light"
              className={`${styles.cell} cell`}
              id="11"
            ></Button>
          </td>
          <td className={styles.td}>
            <Button
              disabled={props.disabled}
              variant="light"
              className={`${styles.cell} cell`}
              id="12"
            ></Button>
          </td>
        </tr>
        <tr>
          <td className={styles.td}>
            <Button
              disabled={props.disabled}
              variant="light"
              className={`${styles.cell} cell`}
              id="20"
            ></Button>
          </td>
          <td className={styles.td}>
            <Button
              disabled={props.disabled}
              variant="light"
              className={`${styles.cell} cell`}
              id="21"
            ></Button>
          </td>
          <td className={styles.td}>
            <Button
              disabled={props.disabled}
              variant="light"
              className={`${styles.cell} cell`}
              id="22"
            ></Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default GameField;
