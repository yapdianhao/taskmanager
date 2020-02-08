import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";

/**
 * Constructor of the edit page. The default value is passed as the attribute.
 */
class EditTask extends React.Component {
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
   * Adds the created task to the queue upon submission
   * @param {The submitted value} event
   */
  onSubmit(event) {
    event.preventDefault();
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/edit/${id}`;
    const { name, description, day, month, year, tag } = this.state;
    if (name.length == 0 || description.length == 0) return;
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
      .then(response => this.props.history.push(`/task/${id}`))
      .catch(error => console.log(error.message));
  }

  /**
   * Fires at the moment when the value is changed.
   * @param {The entered value} event
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Returns the current year, for limiting purposes
   */
  getCurrYear() {
    return new Date().getFullYear();
  }

  /**
   * Creates a list of options of 31 days.
   */
  createDayOptions() {
    var days = [];
    for (var i = 1; i < 32; i++) {
      days.push(<option>{i}</option>);
    }
    return days;
  }

  /**
   * Creates a list of options of 12 months.
   */
  createMonthOptions() {
    var months = [];
    for (var i = 1; i < 13; i++) {
      months.push(<option>{i}</option>);
    }
    return months;
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/tasks/${id}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ task: response }))
      .catch(() => this.props.history.push(`/task/${response.id}`));
  }

  /**
   * Returns what is seen on the screen.
   */
  render() {
    //const { name, description, day, month, year, tag } = this.state;
    return (
      <div className="background">
        <div>
          <Link
            to="/tasks"
            className="btn btn-outline-primary waves-effect taskbackbutton"
          >
            &#8249; Back
          </Link>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h3 className="font-weight-normal mb-3">
              Edit and update this task.
            </h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="taskName">Name</label>
                <input
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
                  name="tag"
                  id="taskTag"
                  className="form-control"
                  required
                  onChange={this.onChange}
                >
                  <option value="urgent">urgent</option>
                  <option value="intermediate">intermediate</option>
                  <option value="trivial">trivial</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Click to confirm update.
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTask;
