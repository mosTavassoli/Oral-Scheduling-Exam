import React from "react";
import {
  Form,
  FormGroup,
  Col,
  Button,
  FormControl,
  Container,
  Row,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { ROLES } from "../shared/consts";

class UserRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: ROLES.TEACHER,
      submitted: false,
      error: "",
      has_error: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event, onLogin) {
    // console.log(this.state.username, this.state.password, this.state.role);
    event.preventDefault();
    onLogin(this.state.username, this.state.password, this.state.role);
  }
  render() {
    // if (this.state.submitted) return <Redirect to="/addexam" />;
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authUser && <Redirect to="/home" />}

            <Container fluid className="center center mt-5">
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                  <h3> Select your Role: </h3>

                  <Form
                    method="POST"
                    onSubmit={(event) =>
                      this.handleSubmit(event, context.loginUser)
                    }
                  >
                    <FormGroup>
                      <select
                        className="form-control"
                        role={this.state.role}
                        onChange={this.handleInputChange}
                        name="role"
                      >
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                      </select>
                    </FormGroup>

                    {this.state.role === ROLES.TEACHER && (
                      <>
                        <FormGroup>
                          <FormControl
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required
                            autoFocus
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormControl
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                          />
                        </FormGroup>
                      </>
                    )}

                    {this.state.role === ROLES.STUDENT && (
                      <>
                        <FormGroup>
                          <FormControl
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Student ID"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required
                            autoFocus
                          />
                        </FormGroup>
                      </>
                    )}

                    <FormGroup>
                      <Button variant="primary" type="submit" color="primary">
                        Login
                      </Button>
                    </FormGroup>
                  </Form>
                  {/* {context.authErr && (
                    <Alert variant="danger">{context.authErr.msg}</Alert>
                  )} */}
                </Col>
              </Row>
            </Container>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default UserRole;
