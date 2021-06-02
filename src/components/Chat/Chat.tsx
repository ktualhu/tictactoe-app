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
import { v4 as uuidv4 } from 'uuid';

function Chat() {
  const [message, setMessage] = useState({
    text: '',
    type: MessageType.PLAIN,
  } as Message);
  const [messages, setMessages] = useState([] as Message[]);

  useEffect(() => {
    handleAlertMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessageSend = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!message.text) return;
    // await get request in then
    createNewMessage();
  };

  // test
  const handleAlertMessage = () => {
    createNewMessage('some username', MessageType.ALERT);
  };

  const createNewMessage = (
    text: string = '',
    type: MessageType = MessageType.PLAIN
  ) => {
    const msg: Message = {
      id: uuidv4(),
      text: text || message.text,
      type: type || MessageType.PLAIN,
    };
    const newMessages = messages.slice();
    newMessages.push(msg);
    setMessages(newMessages);
    setMessage({ text: '', type: MessageType.PLAIN });
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
          messages.map(message => {
            return (
              <Row
                key={message.id!}
                className={
                  message.type === MessageType.PLAIN
                    ? 'm-1 mb-2 d-flex justify-content-end'
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
                type: MessageType.PLAIN,
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
