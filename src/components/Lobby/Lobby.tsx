// components
import React, { useEffect } from 'react';
import MyTable from '../UI/Table/Table';

// bootstrap
import { Row, Alert } from 'react-bootstrap';
import Title from '../UI/Title/Title';
import MyModal from '../UI/Modal/MyModal';
import { RouteComponentProps } from 'react-router-dom';
import http from '../../http';
import { useDispatch, useSelector } from 'react-redux';
import { roomsAllSelector } from '../../store/rooms/roomsSlice';
import { useLobby } from '../../hooks/useLobby';
import { currentUserSelector } from '../../store/users/usersSlice';
import { updateRooms } from '../../store/rooms/roomsSlice';

type LobbyProps = {
  routes?: RouteComponentProps;
  handleRouting?: (path: string) => void;
};

function Lobby(props: LobbyProps) {
  const [showModal, setShowModal] = React.useState(false);
  const rooms = useSelector(roomsAllSelector);
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const { userJoin } = useLobby();

  useEffect(() => {
    http
      .get('/rooms')
      .then(resp => {
        if (resp.data.rooms) {
          dispatch(updateRooms(resp.data.rooms));
        }
        if (resp.data.room_id)
          props.routes?.history.replace(`/rooms/${resp.data.room_id}`);
      })
      .catch(error => console.error(error));
    userJoin(currentUser.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = () => setShowModal(!showModal);

  const handleJoinRoom = (id: string) => {
    props.handleRouting && props.handleRouting('/rooms/' + id);
  };

  const renderAlert = () => {
    return (
      <Row className="justify-content-center">
        <Alert className="" variant="light">
          There is no any room.
          <Alert.Link href="#"> Create one!</Alert.Link>
        </Alert>
      </Row>
    );
  };

  const renderModal = () => {
    return showModal ? <MyModal onHide={handleModal} show={showModal} /> : null;
  };

  return (
    <React.Fragment>
      <Title text={'Lobby'} />
      {false ? (
        renderAlert()
      ) : (
        <MyTable
          handleModal={handleModal}
          handleJoinRoom={(id: string) => handleJoinRoom(id)}
          rooms={rooms}
        />
      )}
      {renderModal()}
    </React.Fragment>
  );
}

export default Lobby;
