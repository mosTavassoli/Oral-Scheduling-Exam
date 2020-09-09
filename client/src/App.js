import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import CreateExam from "./components/CreateExam";
import ExecuteExam from "./components/ExecuteExam";
import ShowSlots from "./components/ShowSlots";
import Teacher from "./components/Teacher";
import API from "./api/API";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import { Col, Row, Container, Alert } from "react-bootstrap";
import { ROLES } from "./shared/consts";
import StudentPage from "./components/StudentPage";
import BookingSlot from "./components/BookingSlot";
import ShowReport from "./components/ShowReport";

class App extends React.Component {
  constructor(props) {
    super(props);

    // this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      err: "",
      isNavOpen: false,
      isReservedButtonClick: false,
      isExecuteButtonClick: false,
      teacherStudentLists: [],
      examLists: [], // contains tle list of Exams for teacher for ShowSlots Component
      teacherSlots: [], // contains the list Of Slots for specific exam for ExecuteExam Component
      role: "",
      listStudentExams: [], //assaigned exams to the student
      listReservedExams: [], //reserved exam and its slot's details
      listSlots: [], //availabe slots related to the specific exam
      fullReports: [], //showing the final report of exams and grade
      listStudentsNotBooked: [], //contain the list of students details that not booked the exam
    };
  }

  toggleNav = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  };
  componentDidMount() {
    //check if the user is authenticated
    API.isAuthenticated()
      .then((user) => {
        this.setState({ authUser: user });
      })
      .catch((err) => {
        this.props.history.push("/login");
        this.setState({ authErr: err.errorObj });
        setTimeout(() => {
          this.setState({
            err: "",
          });
        }, 2000);
      });
  }

  // handleErrors(err) {
  //   if (err) {
  //     if (err.status && err.status === 401) {
  //       this.setState({ authErr: err.errorObj });
  //       this.props.history.push("/login");
  //     }
  //   }
  // }

  logout = () => {
    return API.userLogout().then(() => {
      this.setState({ authUser: null, authErr: null });
      this.props.history.push("/login");
    });
  };

  login = (username, password, role) => {
    return API.userLogin(username, password, role)
      .then((user) => {
        if (user.role === ROLES.TEACHER) {
          this.setState({ authUser: user, authErr: null });
          this.props.history.push("/home");

          this.setState({
            role: this.state.authUser.role,
          });
        } else if (user.role === ROLES.STUDENT) {
          this.setState({ authUser: user, authErr: null });
          this.props.history.push("/student");

          this.setState({
            role: this.state.authUser.role,
          });
        }
      })
      .catch((errorObj) => {
        this.setState({
          err: errorObj.errors[0].msg,
        });

        setTimeout(() => {
          this.setState({
            err: "",
          });
        }, 2500);
      });
  };

  //------- get the List of Students for an authorized Teacher ---- used in CreateExam Component
  studentLists = () => {
    API.getStudentLists()
      .then((students) =>
        this.setState({
          teacherStudentLists: students || [],
        })
      )
      .catch((errorObj) => {
        this.setState({
          err: errorObj.errors[0].msg,
        });
        setTimeout(() => {
          this.setState({
            err: "",
          });
        }, 2000);
      });
  };

  //------- get the List of Exams for an authorized Teacher ---- used in ExecuteExam Component
  examLists = () => {
    API.getExamLists()
      .then((exams) =>
        this.setState({
          examLists: exams || [],
        })
      )
      .catch((errorObj) => {
        this.setState({
          err: errorObj.errors[0].msg,
        });
        setTimeout(() => {
          this.setState({
            err: "",
          });
        }, 2000);
      });
  };
  //***------------------------functions related to Teacher Report page----------------***

  finalResultReport = () => {
    API.getFinalResultReport()
      .then((details) => {
        //getting the array of assaigned exams's details from API'S function (exam_no ,name) and storing into listStudentExams Array
        this.setState({
          fullReports: details,
        });
      })
      .catch((errorObj) => {
        this.setState({
          err: errorObj.errors[0].msg,
        });
        setTimeout(() => {
          this.setState({
            err: "",
          });
        }, 2000);
      });
  };

  getTeacherSlots = async (exam_no, date, isClicked) => {
    this.setState({
      isExecuteButtonClick: isClicked,
    });
    const result = await API.getTeacherSlots(exam_no, date);
    try {
      setTimeout(() => {
        this.setState({
          isExecuteButtonClick: false,
        });
      }, 200);

      this.setState({
        teacherSlots: result || [],
      });
    } catch (errorObj) {
      this.setState({
        err: errorObj.errors[0].msg,
      });
      setTimeout(() => {
        this.setState({
          err: "",
        });
      }, 2000);
    }
  };

  studentNotBooked = () => {
    API.getstudentNotBooked()
      .then((details) => {
        //getting the array of assaigned exams's details from API'S function (exam_no ,name) and storing into listStudentExams Array
        this.setState({
          listStudentsNotBooked: details,
        });
      })
      .catch((errorObj) => {
        this.setState({
          err: errorObj.errors[0].msg,
        });
        setTimeout(() => {
          this.setState({
            err: "",
          });
        }, 2000);
      });
  };

  //***------------------------functions related to StudentPage AND BookingSlots components----------------***

  //------------------------calling the API function for getting the array of assaigned exams
  studentExams = () => {
    API.getStudentExams()
      .then((studentExams) => {
        //getting the array of assaigned exams's details from API'S function (exam_no ,name) and storing into listStudentExams Array

        this.setState({
          listStudentExams: studentExams,
        });
      })
      .catch((errorObj) => {
        this.setState({
          err: errorObj.errors[0].msg,
        });
        setTimeout(() => {
          this.setState({
            err: "",
          });
        }, 2000);
      });
  };
  //------------------------calling the API function for getting the array of reserved exams
  reservedExams = () => {
    API.getReservedExams()
      .then((reservedExams) => {
        //getting the array of reserved exams's details from API'S function (full details) and storing into listReservedExams Array
        this.setState({
          listReservedExams: reservedExams,
        });
      })
      .catch((errorObj) => {
        this.setState({
          err: errorObj.errors[0].msg,
        });
        setTimeout(() => {
          this.setState({
            err: "",
          });
        }, 2000);
      });
  };

  //------------------------after clicking the reserve button in StudentPage component using this is handler function, and it's calling the API function for getting the array of specific exam's slots and passing the exam_no to the API function

  handleReserve = async (exam_no, isClicked) => {
    this.setState({
      isReservedButtonClick: isClicked,
    });
    const result = await API.getExamSlots(exam_no); //passing the exam number (exam_no) and get the array of objects, contains the details of slots related to that exam number
    setTimeout(() => {
      this.setState({
        isReservedButtonClick: false,
      });
    }, 200);

    this.setState({
      listSlots: result,
    });
    this.props.history.push(`/student/reserve?exam_no=${exam_no}`);
  };

  //------------------------using this function inorder to update the arrays in studentPage components
  updateState = async (key, array) => {
    this.setState({
      [key]: array,
    });
  };

  getQueryParam() {
    return this.props;
  }

  render() {
    const value = {
      authUser: this.state.authUser,
      authErr: this.state.authErr,
      loginUser: this.login,
      logoutUser: this.logout,
    };

    return (
      <AuthContext.Provider value={value}>
        <Header
          isNavOpen={this.state.isNavOpen}
          toggleNav={this.toggleNav}
          role={this.state.role}
        />
        <Container fluid>
          <Switch>
            <Route path="/home" component={Teacher}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/exam/create">
              <CreateExam
                studentLists={this.studentLists}
                teacherStudentLists={this.state.teacherStudentLists}
              />
            </Route>
            <Route path="/exam/execute">
              <ExecuteExam
                getExamtLists={this.examLists}
                examLists={this.state.examLists}
                len={this.state.examLists.length}
                getTeacherSlots={this.getTeacherSlots}
                teacherSlots={this.state.teacherSlots}
              />
            </Route>
            <Route path="/exams/slots">
              <ShowSlots
                getTeacherSlots={this.getTeacherSlots}
                teacherSlots={this.state.teacherSlots}
                length={this.state.teacherSlots.length}
                isExecuteButtonClick={this.state.isExecuteButtonClick}
                // getQueryParam={this.getQueryParam}
              />
            </Route>
            <Route path="/exam/showreport">
              <ShowReport
                fullReports={this.state.fullReports}
                finalResultReport={this.finalResultReport}
                studentNotBooked={this.studentNotBooked}
                listStudentsNotBooked={this.state.listStudentsNotBooked}
              />
            </Route>
            <Route path="/student/reserve">
              <BookingSlot
                listSlots={this.state.listSlots}
                handleReserve={this.handleReserve}
                isReservedButtonClick={this.state.isReservedButtonClick}
              />
            </Route>
            <Route path="/student">
              <StudentPage
                listStudentExams={this.state.listStudentExams}
                listReservedExams={this.state.listReservedExams}
                studentExams={this.studentExams}
                reservedExams={this.reservedExams}
                handleReserve={this.handleReserve}
                updateState={this.updateState}
              />
            </Route>
            <Route path="/logout"></Route>
            <Redirect from="/" exact to="login" />
          </Switch>
        </Container>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            {this.state.err ? (
              <Alert variant="danger">
                <Alert.Heading>Warning !</Alert.Heading>
                <p className="">{this.state.err}</p>
              </Alert>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
