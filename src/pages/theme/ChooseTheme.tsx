import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps { }
interface IState {}

class Tasks extends React.Component<IState & RouteComponentProps<any>, IProps>  {

    render() {
        return (
            <div>
                Theme
            </div>
        )
    }
}
export default Tasks;