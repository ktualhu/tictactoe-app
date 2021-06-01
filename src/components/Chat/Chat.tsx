import { useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Form,
} from 'react-bootstrap';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([] as string[]);

  const handleMessageSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message) return;
    const newMessages = messages.slice();
    newMessages.push(message);
    setMessages(newMessages);
    setMessage('');
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
                key={message} // bad bad bad
                className="m-1 mb-2 d-flex justify-content-end"
              >
                <span className="p-2 rounded shadow-sm p-3 bg-white rounded">
                  {message}
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
            value={message}
            onChange={event => setMessage(event.target.value)}
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
