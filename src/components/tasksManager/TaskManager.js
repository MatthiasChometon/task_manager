import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { tasks_manager_container } from "./TaskManager.css"
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';
import axios from 'axios';

class TasksManager extends Component {
    state = {
        tasks: [],
    }
    componentDidMount() {
        this.getAllTasks()
    }
    getAllTasks() {
        axios.get(`https://6091661250c25500176781bb.mockapi.io/TASK`)
            .then(res => {
                const tasks = res.data.reverse();
                this.setState({ tasks });
            })
    }
    changeStateTask(id, checkState) {
        axios.put(`https://6091661250c25500176781bb.mockapi.io/TASK/` + id, { isComplete: !checkState })
            .then(res => {
                // this.getAllTasks()
            })
    }
    deleteAllCompletedTasks() {
        this.state.tasks.forEach(task => {
            if(task.isComplete) {
                axios.delete(`https://6091661250c25500176781bb.mockapi.io/TASK/` + task.id).then(res => {
                    // this.getAllTasks()
                })
            }
        });
    }

    render() {
        return (
            <div className="tasks_manager_container">
                <Jumbotron>
                    {this.props.taskState == "false" &&
                        <div>
                            <h1>Tasks in progress</h1>
                        </div>
                    }
                    {this.props.taskState == "true" &&
                        <div>
                            <h1>Tasks done</h1>
                            <p>
                                <Button variant="primary" onClick={() => this.deleteAllCompletedTasks()}>Clear all</Button>
                            </p>
                        </div>
                    }
                </Jumbotron>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Created at</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tasks.map(task => {
                            if (task.isComplete.toString() == this.props.taskState) {
                                return (<tr key={task.id}>
                                    <td>{task.description}</td>
                                    <td>{task.createdAt}</td>
                                    <td>

                                        <input type="checkbox" defaultChecked={task.isComplete} onChange={() => this.changeStateTask(task.id, task.isComplete)}></input>

                                    </td>
                                </tr>);
                            } else {
                                (<tr key={task.id}>
                                    <td>{task.description}</td>
                                    <td>{task.createdAt}</td>
                                    <td>
                                        <form>

                                            <input type="checkbox" defaultChecked={task.isComplete} onChange={this.handleClick}></input>
                                        </form>
                                    </td>
                                </tr>);
                            }
                        }
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TasksManager;