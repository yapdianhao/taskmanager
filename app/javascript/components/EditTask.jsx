import React from "react";
import { Link } from "react-router-dom";

class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            day: 0,
            month: 0,
            year: 0,
            tag: "urgent"
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const {
            match: {
                params: { id }
            }
        } = this.props;
        const url = `/api/v1/edit/${id}`;
        const { name, description, day, month, year, tag } = this.state;
        if (name.length == 0 || description.length == 0) return;
        const body = {
            name,
            description,
            day,
            month,
            year,
            tag
        };
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push(`/task/${id}`))
        .catch(error => console.log(error.message));
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        const url = `/api/v1/tasks/${id}`;
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ task: response }))
        .catch(() => this.props.history.push(`/task/${response.id}`)); 
    }

    render() {
        const { name, description, day, month, year, tag } = this.state;
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h3 className="font-weight-normal mb-5">
                            Edit and update this task.
                        </h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="taskName">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="taskName"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskDescription">Details</label>
                                <input
                                    type="text"
                                    name="description"
                                    id="taskDescription"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskDay">Todo Day</label>
                                <input
                                    type="number"
                                    name="day"
                                    id="taskDay"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskMonth">Todo Month</label>
                                <input
                                    type="number"
                                    name="month"
                                    id="taskMonth"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskYear">Todo Year</label>
                                <input
                                    type="number"
                                    name="year"
                                    id="taskYear"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskTag">Task's importance</label>
                                <select
                                    name="tag"
                                    id="taskTag"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}>
                                    <option value="urgent">urgent</option>
                                    <option value="intermediate">intermediate</option>
                                    <option value="trivial">trivial</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Click to confirm update.
                            </button>
                            <Link to="/tasks" className="btn btn-link mt-3">
                                Back to tasks menu
                            </Link>
                        </form>
                    </div>
                </div>
            </div>        
        );
    }
}

export default EditTask;