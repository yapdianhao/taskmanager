import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/homepage.scss";

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
      <div>
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
              <select
                className="custom-select"
                //name="tag"
                //id="selectTag"
                //className="form-control"
                onChange={this.filterList}
              >
                <option value="None">select one:</option>
                <option value="urgent">urgent</option>
                <option value="intermediate">intermediate</option>
                <option value="trivial">trivial</option>
              </select>
            </div>
          </form>
          <div>
            {this.state.filteredTask.map((task, index) => (
              <div key={index}>
                <h5 className="card-title">{task.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
