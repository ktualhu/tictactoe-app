import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Title from '../../components/UI/Title/Title';
import { useRooms } from '../../hooks/useRooms';
import http from '../../http';
import RootState from '../../store/state/rootState';
import {
  currentUserSelector,
  updateMyUser,
} from '../../store/users/usersSlice';
import { getRoomById } from '../../utils/helpers/selectRoom';
import Chat from '../Chat/Chat';
import Game from '../Game/Game';

type MatchParams = {
  id: string;
};

type RoomProps = {
  handleRouting?: (path: string) => void;
  routes?: RouteComponentProps<MatchParams>;
};

function RoomComponent(props: RoomProps) {
  const { joinRoom, leaveRoom } = useRooms();
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const roomId = props.routes?.match.params.id;
  const room = useSelector((state: RootState) =>
    roomId ? getRoomById(state, roomId) : null
  );

  useEffect(() => {
    http
      .get(`/rooms/${roomId}`)
      .then(() => {
        dispatch(updateMyUser(roomId!));
      })
      .catch(error => console.error(error));
    roomId && joinRoom(roomId, currentUser.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeaveRoom = () => {
    http.post('/rooms/leave').then(() => {
      dispatch(updateMyUser(''));
      props.handleRouting && props.handleRouting('/');
      leaveRoom(props.routes?.match.params.id!, currentUser.username);
    });
  };

  if (room) {
    return (
      <React.Fragment>
        <Title text={room.roomTitle} />
        <Row>
          <Col>
            <Game />
          </Col>
          <Col>
            <Chat />
          </Col>
        </Row>
        <Button variant="info" onClick={handleLeaveRoom}>
          Back To Lobby
        </Button>
      </React.Fragment>
    );
  }
  return null;
}

export default RoomComponent;
