import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        name: "",
        description: "",
        day: 0,
        month: 0,
        year: 0,
        tag: ""
      }
    };
    this.deleteTask = this.deleteTask.bind(this);
    //this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/show/${id}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ task: response }))
      .catch(() => this.props.history.push("/tasks"));
  }

  deleteTask() {
    {
      console.log("task deleted");
    }
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/tasks"))
      .catch(error => console.log(error.message));
  }

  getBorderColor(tag) {
    switch (tag) {
      case "trivial":
        return "border-success";
      case "intermediate":
        return "border-warning";
      case "urgent":
        return "border-danger";
    }
  }

  getLineColor(tag) {
    switch (tag) {
      case "trivial":
        return "green";
      case "intermediate":
        return "yellow";
      case "urgent":
        return "red";
    }
  }
  render() {
    const { task } = this.state;
    return (
      <div className="background full">
        <div>
          <Link
            to="/tasks"
            className="btn btn-outline-primary waves-effect taskbackbutton"
          >
            &#8249; Back
          </Link>
        </div>
        <div className="row">
          <div className="col-sm-5 mx-auto">
            <div
              className={
                "card border-5 text-center " + this.getBorderColor(task.tag)
              }
            >
              <div className="card-body">
                <div className="card-title pt-3 pb-3">
                  <h3>{task.name}</h3>
                </div>
                <hr />
                <div className="card-text pt-3 pb-3">
                  <p>Description: {task.description}</p>
                </div>
                <hr />
                <div className="card-text pt-3 pb-3">
                  <p>
                    Deadline: {task.day}/{task.month}/{task.year}
                  </p>
                </div>
                <hr />
                <div className="card-text pt-3 pb-3">
                  Importance: {task.tag}
                </div>
              </div>
            </div>
            <Link
              to={`/tasks/${task.id}/edit`}
              className="btn btn-success editbutton"
            >
              Edit this task
            </Link>
            <button
              type="button"
              className="btn btn-danger deletebutton"
              onClick={this.deleteTask}
            >
              Delete Task
            </button>
          </div>
        </div>
        <div className="container"></div>
      </div>
    );
  }
}

export default Task;
