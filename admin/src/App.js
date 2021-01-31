import React, { Component } from 'react'
import { Accordion, Badge, Button, Card, Col, Container, Form, Jumbotron, ListGroup, } from 'react-bootstrap'
import firebase from 'firebase'
import './App.css'

const db = firebase.firestore()

class App extends Component {
  state = {
    code: '',
    users: [],
    emails: [],
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

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result)
      this.setState({ emails: text.split('\n') })
      console.log(text.split('\n'))
    }
    reader.readAsText(e.target.files[0])
  }

  makeFlagColor = (num) => {
    if (num <= 5) {
      return 'success'
    }
    if (num <= 15) {
      return 'warning'
    }
    return 'danger'
  }

  render () {
    return (
      <Container>
        <Jumbotron>
          <h1><b>Exambnb</b></h1>
          <p>Effortless Realtime Proctoring</p>
        </Jumbotron>

        <Form>

          <Form.Label>Exam Code:</Form.Label>

          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Control
                onChange={(e) => this.setState({ code: e.target.value })}
                value={this.state.code}
                type="text"
                placeholder="Enter College Code"
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={this.track}>
                Track
              </Button>
            </Col>

          </Form.Row>
          <br/>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Group>
                <Form.File id="exampleFormControlFile1" onChange={(e) => this.showFile(e)}
                           label="Upload File"/>
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
        <br/>
        <br/>
        <p>
          <b>Online and in the list: {this.state.users.filter(a => this.state.emails.includes(a.email)).length}</b>
        </p>

        <Accordion>
          {this.state.users.filter(a => this.state.emails.includes(a.email)).map((d, k) => {
            return (
              <Card key={k}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={`${k}`}
                  >
                    {d.email}
                  </Accordion.Toggle>
                  <Badge variant={this.makeFlagColor(JSON.parse(d.activities).length)}>Flags: {JSON.parse(d.activities).length}</Badge>
                </Card.Header>
                <Accordion.Collapse eventKey={`${k}`}>
                  <div>
                    <ListGroup>
                      {JSON.parse(d.activities).map((a, i) => {
                        return (
                          <ListGroup.Item key={i}>{a.message} {a.url && a.url !== '' &&
                          <a href={a.url} target="_blank">Link</a>}</ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                  </div>
                </Accordion.Collapse>
              </Card>
            )
          })}
        </Accordion>

        <br/>
        <br/>
        <p>
          <b>Offline and in the list: {this.state.emails.filter(a => !this.state.users.map(e => e.email)).length}</b>
        </p>

        <Accordion>
          {this.state.emails.filter(a => !this.state.users.map(e => e.email).includes(a)).map((d, k) => {
            return (
              <Card key={k}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={`${k}`}
                  >
                    {d}
                  </Accordion.Toggle>
                  <Badge variant="danger">Absent</Badge>

                </Card.Header>

              </Card>
            )
          })}
        </Accordion>
        <br/>
        <br/>

        <p>
          <b>Not in the list: {this.state.users.filter(a => !this.state.emails.includes(a.email)).length}</b>
        </p>

        <Accordion>
          {this.state.users.filter(a => !this.state.emails.includes(a.email)).map((d, k) => {
            return (
              <Card key={k}>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={`${k}`}
                  >
                    {d.email}.
                  </Accordion.Toggle>
                  <Badge variant={this.makeFlagColor(JSON.parse(d.activities).length)}>Flags: {JSON.parse(d.activities).length}</Badge>

                </Card.Header>
                <Accordion.Collapse eventKey={`${k}`}>
                  <div>
                    <ListGroup>
                      {JSON.parse(d.activities).map((a, i) => {
                        return (
                          <ListGroup.Item key={i}>{a.message} {a.url && a.url !== '' &&
                          <a href={a.url} target="_blank">Link</a>}</ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                  </div>
                </Accordion.Collapse>
              </Card>
            )
          })}
        </Accordion>


        <br/>
        <br/>
      </Container>
    )
  }
}

export default App
