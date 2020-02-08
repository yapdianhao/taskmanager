import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";

/**
 * Constructor for the interface of creating a new task.
 */
class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      day: 0,
      month: 0,
      year: 0,
      tag: "urgent"
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Fires at the moment when the value entered is changed.
   * Changes the attribute according to the given value.
   * @param {The value entered} event
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Fires upon clicking submit.
   * The new task gets added to the queue.
   * @param {The action} event
   */
  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/tasks/create";
    const { name, description, day, month, year, tag } = this.state;
    if (name.length == 0 || description == 0) return;
    const body = {
      name,
      description,
      day,
      month,
      year,
      tag
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/task/${response.id}`))
      .catch(error => console.log(error.message));
  }

  /**
   * Returns the current year.
   */
  getCurrYear() {
    return new Date().getFullYear();
  }

  /**
   * Creates a list of 31 days options.
   */
  createDayOptions() {
    var days = [];
    for (var i = 1; i < 32; i++) {
      days.push(<option>{i}</option>);
    }
    return days;
  }

  /**
   * Creates a list of 12 months options.
   */
  createMonthOptions() {
    var months = [];
    for (var i = 1; i < 13; i++) {
      months.push(<option>{i}</option>);
    }
    return months;
  }

  /**
   * Returns what is seen on the screen.
   */
  render() {
    return (
      <div className="background full">
        <div>
          <Link
            to="/"
            className="btn btn-outline-primary waves-effect backbutton"
          >
            &#8249; Home
          </Link>
        </div>
        <div className="row container mt-2">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h3 className="font-weight-normal mb-2">
              Create a new task here. Please fill in the task name, details,
              todo day, month, year, and select level of importance.
            </h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="taskName">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  id="taskName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskDescription">Details</label>
                <input
                  required
                  type="text"
                  name="description"
                  id="taskDescription"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskDay">Todo Day</label>
                <select
                  required
                  type="number"
                  name="day"
                  id="taskDay"
                  className="form-control"
                  required
                  onChange={this.onChange}
                >
                  <option value="" selected disabled hidden>
                    Select day
                  </option>
                  {this.createDayOptions()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="taskMonth">Todo Month</label>
                <select
                  required
                  type="number"
                  name="month"
                  id="taskMonth"
                  className="form-control"
                  required
                  onChange={this.onChange}
                >
                  <option value="" selected disabled hidden>
                    Select month
                  </option>
                  {this.createMonthOptions()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="taskYear">Todo Year</label>
                <input
                  required
                  type="number"
                  name="year"
                  id="taskYear"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  min={this.getCurrYear()}
                  max={this.getCurrYear() + 10}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskTag">Task's importance</label>
                <select
                  required
                  type="string"
                  name="tag"
                  id="taskTag"
                  className="form-control"
                  required
                  onChange={this.onChange}
                >
                  <option value="" selected disabled hidden>
                    Select level of importance here
                  </option>
                  <option value="urgent">urgent</option>
                  <option value="intermediate">intermediate</option>
                  <option value="trivial">trivial</option>
                </select>
              </div>
              <Link to="/tasks" className="btn btn-danger">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary createbutton">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewTask;
