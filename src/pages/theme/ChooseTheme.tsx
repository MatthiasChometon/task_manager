import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
//import '../../config/themes/test.scss'

class ChooseTheme extends React.Component<RouteComponentProps<any>>  {
    componentDidMount() {
        console.log(this.props)
        if(true) {
           // require('../../config/themes/MainTheme.scss')
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default ChooseTheme;