import React, { Component } from 'react'
import { Accordion, Button, Card, Container, Form, ListGroup, } from 'react-bootstrap'
import firebase from 'firebase'

const db = firebase.firestore()

class App extends Component {
  state = {
    code: '',
    users: [],
  }

  track = () => {
    // get all the users whose code is state.code
    const query = db.collection('users').where('code', '==', this.state.code)

    query.onSnapshot(
      (querySnapshot) => {
        console.log(`Received query snapshot of size ${querySnapshot.size}`)
        this.setState({
          users: querySnapshot.docs.map((d) => {
            // temp.activities = JSON.parse(temp.activities)
            return d.data()
          }),
        })
        // ...
      },
      (err) => {
        console.log(`Encountered error: ${err}`)
      }
    )
  }

  render () {
    return (
      <Container>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Exam Code:</Form.Label>
          <Form.Control
            onChange={(e) => this.setState({ code: e.target.value })}
            value={this.state.code}
            type="text"
            placeholder="Enter College Code"
          />
          <Button variant="primary" onClick={this.track}>
            Track
          </Button>{' '}
          <Button variant="secondary" onClick={() => console.log(this.state)}>
            Upload Emails
          </Button>{' '}
        </Form.Group>

        <p>
          <b>Online: {this.state.users.length}</b>
        </p>

        <Accordion>
          {this.state.users.map((d, k) => {
            return (
              <Card key={k}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={`${k}`}
                  >
                    {d.email}. Flags: {JSON.parse(d.activities).length}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={`${k}`}>
                  <div>
                    <b>Visited</b>
                    <br/>
                    <ListGroup>
                      {JSON.parse(d.activities).map((a, i) => {
                        return (
                          <ListGroup.Item key={i}>{a.message}</ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                  </div>
                </Accordion.Collapse>
              </Card>
            )
          })}
        </Accordion>
      </Container>
    )
  }
}

export default App
