import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { form_new_tasks,new_tasks_input, new_tasks_button } from "./FormTask.css"

class FormTask extends Component {
    render() {
        return (
            <div>
                <Form className="form_new_tasks">
                    <Form.Group className="new_tasks_input" controlId="formBasicEmail">
                        <Form.Control placeholder="Enter your new task" />
                    </Form.Group>
                    <Button className="new_tasks_button" variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        );
    }
}

export default FormTask;