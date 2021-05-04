import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { form_new_tasks, new_tasks_input, new_tasks_button } from "./FormTask.css"
import axios from 'axios';

class FormTask extends Component {
    state = {
        taskDescription: ''
    }
    handleTaskChange = event => {
        this.setState({ taskDescription: event.target.value });
    }
    async addNewTask() {
        console.log(this.state.taskDescription)
        await axios.post(`https://6091661250c25500176781bb.mockapi.io/TASK`, { description: this.state.taskDescription })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    render() {
        return (
            <div>
                <Form className="form_new_tasks">
                    <Form.Group className="new_tasks_input">
                        <Form.Control placeholder="Enter your new task" onChange={this.handleTaskChange} />
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