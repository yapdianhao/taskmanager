import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/application.css";
import Item from "./Item";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filteredTask: []
    };
    this.filterList = this.filterList.bind(this);
  }

  filterList(event) {
    let filteredTask = this.state.tasks;
    filteredTask = filteredTask.filter(task => {
      return (
        task.tag.toLowerCase().search(event.target.value.toLowerCase()) != -1
      );
    });
    this.setState({ filteredTask: filteredTask });
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
      .then(response => this.setState({ tasks: response, filteredTask: [] }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    return (
      <div className="background full">
        <div>
          <Link
            to="/"
            className="btn btn-outline-primary waves-effect backbutton"
          >
            &#8249; Back
          </Link>
        </div>
        <div className="searchpage">
          <form>
            <label className="searchpage searchpage-title" htmlFor="selectTag">
              Please select how urgent the desired task is
            </label>
            <div>
              <select className="custom-select" onChange={this.filterList}>
                <option value="None">select one:</option>
                <option value="urgent">urgent</option>
                <option value="intermediate">intermediate</option>
                <option value="trivial">trivial</option>
              </select>
            </div>
          </form>
          <div>
            {this.state.filteredTask
              .sort(function(a, b) {
                if (a.year === b.year) {
                  if (a.month === b.month) {
                    return a.day < b.day ? -1 : 1;
                  }
                  return a.month < b.month ? -1 : 1;
                }
                return a.year < b.year ? -1 : 1;
              })
              .map((task, index) => (
                <div key={index}>
                  <div className="col-md-10 offset-md-1 pt-4 pb-4 text-center">
                    <Item
                      name={task.name}
                      description={task.description}
                      day={task.day}
                      month={task.month}
                      year={task.year}
                      tag={task.tag}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
