import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./FormTask.css"
import axios from 'axios';

class FormTask extends Component {
    state = {
        taskDescription: ''
    }
    handleTaskChange = event => {
        this.setState({ taskDescription: event.target.value });
    }
    addNewTask() {
        axios.post(`/TASK`, { description: this.state.taskDescription, createdAt: Date.now() })
            .then(res => {
                this.props.onCreatedTask(res.data)
                this.inputNewTask.value = "";
            })
    }
    render() {
        return (
            <div>
                <Form className="form_new_tasks">
                    <Form.Group className="new_tasks_input">
                        <Form.Control ref={el => this.inputNewTask = el} placeholder="Enter your new task" onChange={this.handleTaskChange} />
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