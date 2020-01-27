import React from "react";
import { Link } from "react-router-dom";

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="card border-danger">
            <div className="row">
              <div className="container">
                <h4 class="card-header text-danger">{this.props.name}</h4>
                <div class="card-body">
                  <h5 class="card-title">
                    Do by {this.props.day}/{this.props.month}/{this.props.year}
                  </h5>
                  <p class="card-text">{this.props.description}</p>
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
