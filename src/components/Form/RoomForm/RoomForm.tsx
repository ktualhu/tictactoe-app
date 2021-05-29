import React from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
} from 'react-bootstrap';
import { useFormField } from '../../../utils/helpers/form';
import { Room } from '../../../utils/types/rooms';
import http from '../../../http';
import { useLobby } from '../../../hooks/useLobby';

type RoomProps = {
  onHide: () => void;
};

function RoomForm(props: RoomProps) {
  const roomField = useFormField();
  const { createRoom } = useLobby();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (roomField.isValid) {
      http
        .post('/rooms/new', {
          roomTitle: roomField.value,
          roomPrivate: false,
        })
        .then(resp => {
          if (resp.data) {
            createRoom(resp.data as Room);
            props.onHide();
          }
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <Container className="h-100 d-flex justify-content-center text-white">
      <Form onSubmit={event => handleSubmit(event)}>
        <FormGroup>
          <InputGroup className="mb-3">
            <FormControl placeholder="Room Title" type="text" {...roomField} />
          </InputGroup>
          <InputGroup className="mb-3"></InputGroup>
        </FormGroup>
        <FormGroup>
          <Button type="submit" className="w-100 btn btn-info btn-lgbtn-block">
            Create
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
}

export default RoomForm;
