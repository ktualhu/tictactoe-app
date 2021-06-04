import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Form,
} from 'react-bootstrap';
import { Message, MessageType } from '../../utils/types/chat-message';

import { useChat } from '../../hooks/useChat';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../store/users/usersSlice';
import { getAllMessages } from '../../store/chat/chatSlice';
import { constructChatMessage } from '../../utils/helpers/constructChatMessage';

type ChatProps = {
  roomId: string;
};

function Chat(props: ChatProps) {
  const [message, setMessage] = useState({
    text: '',
    type: MessageType.MESSAGE,
  } as Message);
  const currentUser = useSelector(currentUserSelector);
  const messages = useSelector(getAllMessages);
  const { showChatJoinAlert, sendMessage } = useChat();

  useEffect(() => {
    showChatJoinAlert(props.roomId, createNewMessage(MessageType.JOIN));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessageSend = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!message.text) return;
    sendMessage(props.roomId, createNewMessage());
  };

  const createNewMessage = (type: MessageType = MessageType.MESSAGE) => {
    const msg = constructChatMessage(currentUser.username, type, message.text);
    setMessage({ text: '', type: MessageType.MESSAGE, author: '' });
    return msg;
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Chat</h1>
        </Col>
      </Row>
      <Container
        className="p-1 bg-light text-dark overflow-auto"
        style={{ height: '400px' }}
      >
        {messages.length ? (
          messages.map((message: Message) => {
            return (
              <Row
                key={message.id!}
                className={
                  message.type === MessageType.MESSAGE
                    ? message.author === currentUser.username
                      ? 'm-1 mb-2 d-flex justify-content-end'
                      : 'm-1 mb-2 d-flex justify-content-start'
                    : 'm-1 mb-2 d-flex justify-content-center'
                }
              >
                <span className="p-2 rounded shadow-sm p-3 bg-white rounded">
                  {message.text}
                </span>
              </Row>
            );
          })
        ) : (
          <span className="col-10 p-2 rounded shadow-sm p-3 bg-white rounded">
            No messages yet
          </span>
        )}
      </Container>
      <Form onSubmit={event => handleMessageSend(event)}>
        <InputGroup>
          <FormControl
            placeholder="Your message"
            aria-label="Your message"
            value={message.text}
            onChange={event =>
              setMessage({
                text: event.target.value,
                type: MessageType.MESSAGE,
              } as Message)
            }
          />
          <Button type="submit" variant="info" id="button-addon2">
            Send
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default Chat;
