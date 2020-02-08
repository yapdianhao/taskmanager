import React from "react";

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  getBorderColor() {
    switch (this.props.tag) {
      case "trivial":
        return "card border-success";
      case "intermediate":
        return "card border-warning";
      case "urgent":
        return "card border-danger";
    }
  }

  getFontColor() {
    switch (this.props.tag) {
      case "trivial":
        return "text-success";
      case "intermediate":
        return "text-warning";
      case "urgent":
        return "text-danger";
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className={this.getBorderColor()}>
            <div className="row">
              <div className="container">
                <h4 className={"card-header " + this.getFontColor()}>
                  {this.props.name}
                </h4>
                <div className="card-body">
                  <h5 className="card-title">
                    Do by {this.props.day}/{this.props.month}/{this.props.year}
                  </h5>
                  <p className="card-text">{this.props.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
