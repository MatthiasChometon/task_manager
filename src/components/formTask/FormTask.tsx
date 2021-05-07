import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./FormTask.scss"
import axios from 'axios';
import Task from '../../models/TaskModel';

interface IProps {
    onCreatedTask: (task: Task) => void
}

interface IState {
    taskDescription: string;
}

class FormTask extends Component<IProps, IState> {
    inputNewTask: any;
    handleTaskChange = (event: any) => {
        this.setState({ taskDescription: event.target.value });
    }
    addNewTask() {
        if (this.state.taskDescription !== "") {
            axios.post(`/TASK`, { description: this.state.taskDescription, createdAt: Date.now() })
                .then(res => {
                    this.props.onCreatedTask(res.data)
                    this.inputNewTask.value = "";
                })
        }
    }
    render() {
        return (
            <div className="form_new_tasks_container">
                <Form className="form_new_tasks">
                    <Form.Group className="new_tasks_input">
                        <Form.Control ref={(el: any) => this.inputNewTask = el} placeholder="Enter your new task" onChange={this.handleTaskChange} />
                    </Form.Group>
                    <Button className="new_tasks_button" variant="primary" onClick={() => this.addNewTask()}>
                        Create
                    </Button>
                </Form>
            </div>
        );
    }
}

export default FormTask;