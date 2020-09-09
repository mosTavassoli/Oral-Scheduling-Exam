import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";

import API from "../api/API";
import moment from "moment";
import { AuthContext } from "../auth/AuthContext";

//STUDENT SEGMENT
class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.studentExams(); //calling this function to get data of assigned exam to student from the database after login
    this.props.reservedExams(); //calling this function to get data of student's reserved exam from the database after login
  }

  gradeConversion(grade) {
    let value = grade;
    switch (value) {
      case -1:
        return (value = "Fail");
      case -2:
        return (value = "Withdraw");
      case -3:
        return (value = "Absent");
      case 31:
        return (value = "30L");
      default:
        return (value = grade);
    }
  }

  //----------------Conditional rendering of "cancel button"

  renderCancelButton(reservedExam) {
    //passed reserved exam object to this funciton to cancel
    if (
      moment().isSameOrAfter(reservedExam.date) ||
      reservedExam.grade !== null
    )
      //checking the current date is sameOrafter of exam date or not
      return <p>Not possible to cancel the exam</p>; // show this msg instead of button
    return (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.handleCancelReservation(reservedExam)} //calling handler and pass the single reservedexam object
      >
        Cancel
      </button>
    );
  }

  //----------------handler of "cancel button"-------------------
  handleCancelReservation = async (reservedExam) => {
    await API.cancelExam(reservedExam);
    const listStudentExams = this.props.listStudentExams.filter(
      (e) => e.exam_no !== reservedExam.exam_no
    );
    listStudentExams.push({ ...reservedExam });
    let listReservedExams = this.props.listReservedExams;
    listReservedExams = listReservedExams.filter(
      (e) => e.id !== reservedExam.id
    );
    this.props.updateState("listStudentExams", listStudentExams);
    this.props.updateState("listReservedExams", listReservedExams);
  };

  renderExams() {
    const { length: examCount } = this.props.listStudentExams; //checking the length of listStudentexams array

    if (examCount === 0)
      //if length of array is zero,the below <p> will render instead of table
      return (
        <h5 className="mt-5">
          Ooops There are no exams assigned to you to reserve OR you missed
          deadline (deadline is a day before the exam's first session date)
          !!!!!
        </h5>
      ); //
    return (
      <div>
        <h5 className="mt-5">There are {examCount} exams assigned to you</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Exam Title</th>
              <th>Exam Number</th>
              <th>Reserve the exam</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listStudentExams.map((exam, index) => (
              <tr key={index}>
                <td>{exam.name}</td>
                <td>{exam.exam_no}</td>
                <td>
                  <Button
                    key={index}
                    onClick={() => this.props.handleReserve(exam.exam_no, true)} //calling the handleReserve (in app.js) to get list of slots of specific exam
                    width="40"
                    className="btn btn-primary w-50"
                  >
                    Reserve Exam
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  //----------------Conditional rendering of list of Reserved exams and it's slot for student-------------------

  renderReserveredExams() {
    const { length: countReserved } = this.props.listReservedExams; // checking the length of listReservedExams array that contains list of exams that student has already reserved.
    if (countReserved === 0)
      return <h5 className="mt-5">There are no reserved exams </h5>;
    return (
      <div>
        <h5 className="mt-5">You have {countReserved} reserved exams</h5>
        <table className="table">
          <thead>
            <tr>
              <td>Exam title</td>
              <td>Date</td>
              <td>Start Time</td>
              <td>End Time</td>
              <td>Grade</td>
              <td>Cancel the exam</td>
            </tr>
          </thead>
          <tbody>
            {this.props.listReservedExams.map((reservedExam, index) => (
              <tr key={index}>
                <td>{reservedExam.name}</td>
                <td>{reservedExam.date}</td>
                <td>{reservedExam.start_time}</td>
                <td>{reservedExam.end_time}</td>
                {/* <td>{reservedExam.grade}</td> */}
                <td>{this.gradeConversion(reservedExam.grade)}</td>
                <td>{this.renderCancelButton(reservedExam)}</td>
                {/* calling the conditional rendering function of button  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <Container>
            <h2 className="mt-5  mb-5">
              Welcome Student. {context.authUser?.name}{" "}
            </h2>
            <div>
              <div>{this.renderExams()}</div>
              {/*calling the conditional rendering function of showing list availabe exams which are assainged to the student  */}
              <div> {this.renderReserveredExams()}</div>
              {/*calling the conditional rendering function of showing list reserved exams which are registered by student  */}
            </div>
          </Container>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default StudentPage;
