import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
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
    console.log('here', currentUser);

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
        <Row className="p-3">
          <Col>
            <Row className="pl-3">
              {/* <Title text={room.roomTitle} /> */}
              <h3>{room.roomTitle}</h3>
            </Row>
          </Col>
          <Col xs lg={2}>
            <Row className="pr-4 justify-content-end">
              <Button variant="info" onClick={handleLeaveRoom}>
                Back To Lobby
              </Button>
            </Row>
          </Col>
        </Row>
        <Row className="pl-3">
          <Col>
            <Game />
          </Col>
          <Col>
            <Chat roomId={roomId!} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  return null;
}

export default RoomComponent;
