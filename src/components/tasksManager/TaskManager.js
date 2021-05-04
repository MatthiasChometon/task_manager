import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { tasks_manager_container } from "./TaskManager.css"
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class TasksManager extends Component {

    state = {
        tasks: []
    }
    componentDidMount() {
        axios.get(`https://6091661250c25500176781bb.mockapi.io/TASK`)
            .then(res => {
                const tasks = res.data;
                this.setState({ tasks });
            })
    }
    render() {
        return (
            <div className="tasks_manager_container">
                <Jumbotron>
                    <h1>Tasks {this.props.tasks}</h1>
                    {this.props.tasks == "done" &&
                        <p>
                            <Button variant="primary">Clear all</Button>
                        </p>
                    }
                </Jumbotron>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tasks.map(task => {
                            console.log(task.isComplete)
                            if (task.isComplete == false) {
                                <tr>
                                    <td>{task.description}</td>
                                    <td>{task.createdAt}</td>
                                    <td>delete</td>
                                </tr>
                            }
                        })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TasksManager;