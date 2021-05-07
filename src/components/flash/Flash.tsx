import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

interface IProps {
    visibility: boolean;
    type: string;
    message: string;
    hideFlash: () => void
}


class Flash extends Component<IProps> {
    render() {
        return (
            <div>
                {this.props.visibility}
                {this.props.visibility === true &&
                    <Alert variant={this.props.type} onClose={() => this.props.hideFlash()} dismissible>
                        <Alert.Heading>{this.props.type}</Alert.Heading>
                        <p>
                            {this.props.message}
                        </p>
                    </Alert>}
            </div>
        );
    }
}

export default Flash;