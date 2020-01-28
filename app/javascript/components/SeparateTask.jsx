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
      <div className={this.getBorderColor()}>
        <h5>this is a text</h5>
      </div>
    );
  }
}

export default SeparateTask;
