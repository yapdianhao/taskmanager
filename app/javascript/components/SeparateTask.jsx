import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";

/**
 * The constructor of the individual task seen in the task menu.
 */
class SeparateTask extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Determines the background color of the task based on importance.
   */
  getBackgroundColor() {
    switch (this.props.tag) {
      case "trivial":
        return "bg-success border-success rounded shadow";
      case "intermediate":
        return "bg-warning border-warning rounded shadow";
      case "urgent":
        return "bg-danger border-danger rounded shadow";
    }
  }

  /**
   * Determines the button color of the the task.
   */
  getButtonColor() {
    switch (this.props.tag) {
      case "trivial":
        return "bg-success";
      case "intermediate":
        return "bg-warning";
      case "urgent":
        return "bg-danger";
    }
  }

  /**
   * Returns what is seen on the screen.
   */
  render() {
    return (
      <div className="col-md-6">
        <div className="card mb-5">
          <div className={this.getBackgroundColor()}>
            <div className="card-body text-center">
              <h5 className="card-title">{this.props.name}</h5>
              {/*<p className="card-text">{this.props.description}</p>*/}
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Deadline: {this.props.day}/{this.props.month}/
                  {this.props.year}
                </li>
                <li className="list-group-item">
                  Importance: {this.props.tag}
                </li>
                <li className="list-group-item">
                  <Link
                    to={`/task/${this.props.id}`}
                    className={"btn " + this.getButtonColor()}
                  >
                    View task
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SeparateTask;
