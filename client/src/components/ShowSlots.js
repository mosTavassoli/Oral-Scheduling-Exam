import React from "react";
import { Col, Container, Row, Table, FormGroup, Button } from "react-bootstrap";
// import * as QueryString from "query-string";

import { AuthContext } from "../auth/AuthContext";
import { Redirect } from "react-router-dom";
import API from "../api/API";

class ShowSlots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      submitted: false,
      counter: 0,
      grade: [],
      examId: [],
      payload: {
        grades: [],
        examIds: [],
      },
    };
  }
  componentDidMount() {
    if (!this.props.isExecuteButtonClick) {
      this.props.getTeacherSlots(window.location.href.split("=")[1]);
    }
  }

  handleInputChange = (exam_id, event) => {
    event.preventDefault();
    const target = event.target;

    let value = target.value;
    // const name = target.name;

    // ====================== in order to prevent duplication grade into array
    const index = this.state.examId.indexOf(exam_id);

    switch (value) {
      case "fail":
        value = -1;
        break;
      case "withdraw":
        value = -2;
        break;
      case "absent":
        value = -3;
        break;
      case "none":
        this.setState({
          counter: this.state.counter - 1,
          grade: this.state.grade.filter((x, i) => i !== index),
          examId: this.state.examId.filter((x, i) => i !== index),
        });
        break;
      default:
        value = parseInt(value);
    }

    let grades = this.state.grade;

    if (index !== -1 && value !== "none") {
      grades[index] = value;

      this.setState({
        grade: grades,
      });
    } else if (value !== "none") {
      this.setState((prevState) => {
        return {
          examId: [...prevState.examId, exam_id],
          grade: [...prevState.grade, value],
          counter: this.state.counter + 1,
        };
      });
    }
  };

  saveExamHandler = async () => {
    this.setState(
      {
        submitted: !this.state.submitted,
        payload: {
          grades: this.state.grade,
          examIds: this.state.examId,
        },
      },
      async () => {
        await API.updateGrade(this.state.payload);
      }
    );
  };

  render() {
    if (this.state.submitted) {
      return <Redirect to="/home" />;
    }
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authUser === null && <Redirect to="/login"></Redirect>}
            <Container>
              <Row>
                <Col md={10}>
                  <Table striped bordered hover size="sm" className="mt-5">
                    <thead>
                      <tr>
                        {/* <th>#</th> */}
                        <th>Exam Number</th>
                        <th>Student Number</th>
                        <th>Student Name</th>
                        <th>Duration</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        {/* <th>Booking Status</th> */}
                        <th>Date</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.teacherSlots?.map((teacherSlot) => (
                        <tr key={teacherSlot.id}>
                          {/* <td>{teacherSlot.id}</td> */}
                          <td>{teacherSlot.exam_no}</td>
                          <td>{teacherSlot.username}</td>
                          <td>{teacherSlot.name}</td>
                          <td>{teacherSlot.duration}</td>
                          <td>{teacherSlot.start_time}</td>
                          <td>{teacherSlot.end_time}</td>
                          {/* <td>{teacherSlot.booking_status}</td> */}
                          <td>{teacherSlot.date}</td>
                          <td>
                            <FormGroup>
                              <select
                                value={this.state.value}
                                size="sm"
                                className="form-control "
                                name="grade"
                                onChange={(event) =>
                                  this.handleInputChange(teacherSlot.id, event)
                                }
                              >
                                <option value="none">Select Option</option>
                                <option value="fail">Fail</option>
                                <option value="withdraw">Withdraw</option>
                                <option value="absent">Absent</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                              </select>
                            </FormGroup>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Button
                      className="mt-5"
                      variant="primary"
                      type="submit"
                      color="primary"
                      onClick={this.saveExamHandler}
                      disabled={this.state.counter !== this.props.length}
                    >
                      Save Grades
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default ShowSlots;
