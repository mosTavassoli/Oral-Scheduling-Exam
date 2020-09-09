import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../api/API";
import { Row, Col } from "reactstrap";
import { Container } from "react-bootstrap";

//SHOWING THE EXAM'S SLOT IN THIS PAGE
class BoookingSlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSlot: {},
      buttonDisabled: true,
      mounted: false,
    };
  }
  componentDidMount() {
    if (!this.props.isReservedButtonClick) {
      this.props.handleReserve(window.location.href.split("=")[1]);
    }
  }

  handlerSelect = async (slot) => {
    //get details in object form of selected slot and store into selectedSlot

    await this.setState({
      selectedSlot: slot,
      buttonDisabled: false,
    });
  };

  handlersave = async () => {
    //saving (PUT) selectedSlot object into database
    await API.reservingSlot(this.state.selectedSlot.id); //passing only the slot's ID to Api

    this.setState({ redirect: true });
  };

  //---------------------rendering the list of availabe slot and saving and cenceling button -------------------
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/student" />;
    }

    return (
      <Container>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>Choose..</th>
              </tr>
            </thead>
            <tbody>
              {this.props.listSlots.map((slot, index) => (
                <tr key={index}>
                  <td>{slot.date}</td>
                  <td>{slot.start_time}</td>
                  <td>
                    <input
                      onChange={() => this.handlerSelect(slot)}
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Row>
            <Col>
              <button
                onClick={this.handlersave}
                disabled={this.state.buttonDisabled}
                className="btn btn-primary w-30  "
              >
                Save
              </button>
            </Col>
            <Col>
              <Link
                width="40"
                key="1"
                to={{
                  pathname: "/student/", //back to the student main page by clicking cancel button
                }}
                className="btn btn-danger w-30"
              >
                Cancel
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default BoookingSlot;
