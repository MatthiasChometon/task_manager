import React from 'react';
import { Jumbotron, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import { RouteComponentProps } from 'react-router-dom';


interface IProps {
    setNewTheme: (newTheme: string) => void
}
interface IState { }

class Tasks extends React.Component<IProps, IState & RouteComponentProps<any>>  {

    changeTheme = (newTheme: string) => {
        this.props.setNewTheme(newTheme);
    }
    render() {
        return (
            <Jumbotron className="choose_theme_jumbotron">
                <h1 className="choose_theme_title">Change the Theme</h1>
                <p>
                    We will add new themes soon
                </p>
                <p>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton variant="secondary" value={1} onClick={() => this.changeTheme('blue')}>blue</ToggleButton>
                        <ToggleButton variant="secondary" value={2} onClick={() => this.changeTheme('green')}>green</ToggleButton>
                    </ToggleButtonGroup>
                </p>
            </Jumbotron>
        )
    }
}
export default Tasks;