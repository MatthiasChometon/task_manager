import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import "./TaskManager.css"
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class TasksManager extends Component {
    changeStateTask(task_to_update) {
        task_to_update.isComplete = !task_to_update.isComplete
        this.props.onUpdateTask(task_to_update)
    }
    deleteCompletedTasks() {
        this.props.onDeleteTasks()
    }
    render() {
        return (
            <div className="tasks_manager_container">
                <Jumbotron>
                    {this.props.taskState === "false" &&
                        <div>
                            <h1>Tasks in progress</h1>
                        </div>
                    }
                    {this.props.taskState === "true" &&
                        <div>
                            <h1>Tasks done</h1>
                            <p>
                                <Button variant="primary" onClick={() => this.deleteCompletedTasks()}>Clear all</Button>
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
                        {this.props.tasks.map(task => {
                            if (task.isComplete.toString() === this.props.taskState) {
                                return (<tr key={task.id}>
                                    <td>{task.description}</td>
                                    <td>{new Date(task.createdAt).toUTCString()}</td>
                                    <td>
                                        <input type="checkbox" defaultChecked={task.isComplete} onChange={() => this.changeStateTask(task)}></input>
                                    </td>
                                </tr>);
                            }
                            return null
                        }
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TasksManager;