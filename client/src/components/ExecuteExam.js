import React from "react";
import { Form, Col, Container, Row, Table, Button } from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";
import { Redirect } from "react-router-dom";

class ExecuteExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam_no: "",
      date: "",
    };
  }

  componentDidMount() {
    this.props.getExamtLists();
  }

  executeExamHandler = (exam_no, date) => {
    this.setState({
      exam_no: exam_no,
      date: date,
    });
    this.props.getTeacherSlots(exam_no, date, true);
  };

  render() {
    if (this.state.exam_no) {
      return <Redirect to={`/exams/slots?exam_no=${this.state.exam_no}`} />; // passing exam_no as QueryString for preventing loosing Data when refresh the Page
    }
    return (
      <AuthContext.Consumer>
        {(context) => (
          <>
            {context.authUser === null && <Redirect to="/login"></Redirect>}
            <Container>
              <Row>
                <Col md={12}>
                  {this.props.len !== 0 ? (
                    <Table striped bordered hover size="sm" className="mt-5">
                      <thead>
                        <tr>
                          <th>Exam Number</th>
                          <th>Date</th>
                          <th>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.examLists?.map((examList, index) => (
                          <tr key={index}>
                            <td>{examList.exam_no}</td>
                            <td>{examList.date}</td>
                            <td>
                              <Form.Group controlId="">
                                <Button
                                  onClick={() =>
                                    this.executeExamHandler(
                                      examList.exam_no,
                                      examList.date
                                    )
                                  }
                                  // to={{
                                  //   pathname: "/exams/slots",
                                  // }}
                                  name="execute"
                                  className="btn btn-primary"
                                >
                                  Execute
                                </Button>
                              </Form.Group>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p className="d-flex justify-content-center text-danger display-5 mt-5">
                      There is no Exam to execute
                    </p>
                  )}
                </Col>
              </Row>
            </Container>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default ExecuteExam;
