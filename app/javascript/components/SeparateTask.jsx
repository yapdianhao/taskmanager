import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";

class SeparateTask extends React.Component {
  constructor(props) {
    super(props);
  }

  getBorderColor() {
    switch (this.props.tag) {
      case "trivial":
        return "separate separate-trivial";
      case "intermediate":
        return "separate separate-intermediate";
      case "urgent":
        return "separate-urgent";
    }
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <p className="card-text">{this.props.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Deadline: {this.props.day}/{this.props.month}/{this.props.year}
            </li>
            <li className="list-group-item">
              Imperativeness: {this.props.tag}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SeparateTask;
