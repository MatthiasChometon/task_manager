import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import './Flash.scss'

interface IProps {

}
interface IState {
    visibility: boolean,
    type: string,
    message: string,
    hideTime: number,
    mouseOver: boolean
}

class Flash extends Component<IProps, IState> {
    readonly state = {
        hideTime: 4000,
        visibility: false,
        type: "",
        message: "",
        mouseOver: false
    };

    sendFlashMessage(message: string, type: string) {
        this.setState({
            visibility: true,
            type: type,
            message: message
        });

        setTimeout(() => {
            if (!this.state.mouseOver) {
                this.setState({
                    visibility: false
                });
            }
        }, this.state.hideTime);

    }

    setMouseover = (newMouseOverState: boolean) => {
        this.setState({
            mouseOver: newMouseOverState
        });
    }

    onHoverLeave = () => {
        this.setMouseover(false)
        setTimeout(() => {
            if (!this.state.mouseOver) {
                this.setState({
                    visibility: false
                });
            }
        }, this.state.hideTime/2);
    }

    setVisibility = (newVisibility: boolean) => {
        this.setState({
            visibility: newVisibility
        });
    }

    render() {
        return (
            <div onMouseEnter={() => this.setMouseover(true)} onMouseLeave={() => this.onHoverLeave()} className="flash_messages_container">
                {this.state.visibility === true &&
                    <Alert onClose={() => this.setVisibility(false)} variant={this.state.type} dismissible>
                        <Alert.Heading className="flash_message_title">{this.state.type}</Alert.Heading>
                        <p>
                            {this.state.message}
                        </p>
                    </Alert>}
            </div>
        );
    }
}

export default Flash;