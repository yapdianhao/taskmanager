import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";
import Separatetask from "./SeparateTask";

/**
 * The constructor for the task menu.
 */
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

  /**
   * Determines the background image rendered based on the number
   * of current tasks. If it is only in a row, return a full image.
   * @param {number of current tasks} tasks
   */
  getBackground(tasks) {
    if (tasks.length <= 2) {
      return "full";
    } else {
      return "";
    }
  }

  /**
   * Returns what is seen on the screen.
   */
  render() {
    const { tasks } = this.state;
    const allTasks = tasks.map((task, index) => (
      <Separatetask
        key={index}
        name={task.name}
        description={task.description}
        day={task.day}
        month={task.month}
        year={task.year}
        id={task.id}
        tag={task.tag}
      />
    ));
    const noTask = (
      <div className="mx-auto align-items-center justify-content-center mt-40">
        No pending task yet. Good job!
      </div>
    );
    return (
      <div className={"background " + this.getBackground(tasks)}>
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
        <div className="container">
          <div className="row">{tasks.length > 0 ? allTasks : noTask}</div>
        </div>
      </div>
    );
  }
}

export default Tasks;
