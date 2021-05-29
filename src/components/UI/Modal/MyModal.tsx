import { Modal } from 'react-bootstrap';
import RoomForm from '../../Form/RoomForm/RoomForm';

type MyModalProps = {
  show: boolean;
  onHide: () => void;
};

function MyModal(props: MyModalProps) {
  return (
    <Modal
      {...props}
      centered
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RoomForm onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
}

export default MyModal;
