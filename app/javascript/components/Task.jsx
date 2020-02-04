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

  render() {
    const { task } = this.state;
    return (
      <div>
        <div>
          <Link
            to="/"
            className="btn btn-outline-primary waves-effect backbutton"
          >
            &#8249; Back
          </Link>
        </div>
        <div className="col-sm-5 mx-auto">
          <div className="card text-center">
            <div className="card-body">
              <div className="card-title pt-3 pb-3">
                <h3>{task.name}</h3>
              </div>
              <hr />
              <div className="card-text pt-3 pb-3">
                <p>{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
