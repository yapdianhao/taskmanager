import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";

class SeparateTask extends React.Component {
  constructor(props) {
    super(props);
  }

  getBackgroundColor() {
    switch (this.props.tag) {
      case "trivial":
        return "bg-success border-success";
      case "intermediate":
        return "bg-warning border-warning";
      case "urgent":
        return "bg-danger border-danger";
    }
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="card mb-3">
          <div className={this.getBackgroundColor()}>
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <p className="card-text">{this.props.description}</p>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Deadline: {this.props.day}/{this.props.month}/
                  {this.props.year}
                </li>
                <li className="list-group-item">
                  Imperativeness: {this.props.tag}
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
