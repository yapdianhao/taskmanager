import React from "react";
import { Link } from "react-router-dom";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = { task: { 
            name: "",
            description: "",
            day: 0,
            month: 0,
            year: 0,
            tag: ""
         } };
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
            <div className="">
                <div className="col-sm-12 col-lg-2 container py-5">
                    <h3>
                        {task.name}
                    </h3>
                </div>
                <div className="container py-5 justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-sm-12 col-lg-2">
                            <h5>{task.description}</h5>
                            <h5>{task.day}/{task.month}/{task.day}</h5>
                            <h5 style={ { color: "red" } }>{task.tag}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-2 justify-content-center align-items-center">
                    <button type="button" className="btn btn-danger" onClick={this.deleteTask}>
                        Delete Task
                    </button>
                </div>
                <div className="col-sm-12 col-lg-2 justify-content-center align-items-center">
                    <Link to={`/tasks/${task.id}/edit`} className="btn btn-link">
                        Edit this task
                    </Link>
                </div>
                <div>
                    <Link to="/tasks" className="btn btn-link">
                        Back to tasks
                    </Link>
                </div>
            </div>
        );
    }
}

export default Task;