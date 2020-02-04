import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";

export default () => (
  <div className="jumbotron jumbotron-fluid bg-transparent homepage">
    <div className="container secondary-color">
      <h1 className="display-4">To-dos</h1>
      <p className="lead">Your task manager to address your procrastination</p>
      <hr className="my-4" />
      <Link to="/tasks" className="btn btn-outline-primary waves-effect">
        View To-do Tasks
      </Link>
      <hr className="my-4" />
      <div>
        <Link to="/Search" className="btn btn-outline-danger">
          Search bar
        </Link>
      </div>
      <hr className="my-4" />
      <div>
        <Link to="/Task" className="btn btn-outline-warning">
          Add Task
        </Link>
      </div>
    </div>
  </div>
  //</div>
);
