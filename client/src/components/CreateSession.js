import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Input,
  FormGroup,
  Form,
  Alert,
} from "reactstrap";

import DatePicker from "react-datepicker";

import * as moment from "moment";

class CreateSession extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().toDate(),
      startingTime: "",
      totalDuration: "",
    };
  }

  dateChangeHandler = (date, key) => {
    this.setState({
      [key]: date,
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleCreateSession = (ev) => {
    ev.preventDefault();
    this.props.toggleModal(); //close modal once it is created;
    let session = Object.assign({}, this.state);
    session.date = this.state.date;
    this.props.slotGenerator(session);
  };
  render() {
    return (
      <Modal toggle={this.props.toggleModal} isOpen={this.props.isModalOpen}>
        <ModalHeader toggle={this.props.toggleModal}>
          Create Session
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleCreateSession}>
            <FormGroup>
              <Label htmlFor="date">Date : {"\u00A0"} </Label>
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={(date) => this.dateChangeHandler(date, "date")}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="startingTime">Starting Time :</Label>
              <Input
                type="time"
                id="startingTime"
                name="startingTime"
                value={this.state.startingTime}
                onChange={this.handleInputChange}
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="date">Total Duration :</Label>
              <Input
                type="text"
                id="totalduration"
                name="totalDuration"
                value={this.state.totalDuration}
                onChange={this.handleInputChange}
                required
              ></Input>
            </FormGroup>

            {this.state.totalDuration % this.props.duration === 0 ? (
              <Button type="submit" value="submit" color="primary">
                Create
              </Button>
            ) : (
              <Alert variant="info">
                <p>This Number must be multiple of "duration of each Slot"</p>
              </Alert>
            )}
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateSession;
