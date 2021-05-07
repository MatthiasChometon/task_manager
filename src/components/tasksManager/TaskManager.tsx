import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import "./TaskManager.scss"
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Task from '../../models/TaskModel';

interface IProps {
    taskState: string;
    tasks: Task[];
    onUpdateTask: (task: Task) => void;
    onDeleteTasks: () => void;
}

class TasksManager extends Component<IProps> {
    changeStateTask(task_to_update: Task) {
        task_to_update.isComplete = !task_to_update.isComplete
        this.props.onUpdateTask(task_to_update)
    }
    deleteCompletedTasks() {
        this.props.onDeleteTasks()
    }
    render() {
        return (
            <div className="tasks_manager">
                <Jumbotron className="tasks_title_container">
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
                <Table striped bordered hover className="tasks_manager_table">
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