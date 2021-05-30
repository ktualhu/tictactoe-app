import { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap';
import Title from '../UI/Title/Title';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([] as string[]);

  const handleMessageSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        style={{ height: '500px' }}
      >
        {messages.length ? (
          messages.map(message => {
            return (
              <Row className="m-1 mb-2 d-flex justify-content-end">
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
      <Row>
        <Col>
          <Form onSubmit={event => handleMessageSend(event)}>
            <FormGroup>
              <Row>
                <Col xs={10}>
                  <FormControl
                    type="text"
                    placeholder="Your message"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                  />
                </Col>
                <Col xs={1}>
                  <Button variant="info" type="submit">
                    Send
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;

{
  /* <Row className=" m-1 d-flex justify-content-start">
          <span className="col-5 p-2 rounded shadow-sm p-3 bg-white rounded">
            from User message from User message from User message from User
            message
          </span>
        </Row> */
}
