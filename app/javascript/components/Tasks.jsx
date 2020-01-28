import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";
import SeparateTask from "./SeparateTask";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    const url = "api/v1/tasks/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tasks: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { tasks } = this.state;
    const allTasks = tasks.map((task, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card border-danger">
          <SeparateTask item={task} />
          <Link to={`/task/${task.id}`} className="btn custom-button">
            View Task
          </Link>
        </div>
      </div>
    ));
    const noTask = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No task yet. Create a new one <Link to="/task">here</Link>
        </h4>
      </div>
    );
    return (
      <div>
        <div className="navbar">
          <li>
            <div className="text-right mb-3">
              <Link to="/" className="btn btn-outline-primary">
                &#8249; Back
              </Link>
            </div>
          </li>
          <li>
            <h3>Task List</h3>
          </li>
          <li>
            <div className="text-right mb-3">
              <Link to="/task" className="btn btn-outline-primary">
                Create New Task
              </Link>
            </div>
          </li>
        </div>
        <div className="py-5">
          <div className="container">
            <div>{tasks.length > 0 ? allTasks : noTask}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tasks;
