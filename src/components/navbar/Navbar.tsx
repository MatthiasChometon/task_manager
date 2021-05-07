import React from "react";
import NavBarB from 'react-bootstrap/NavBar';

class Navbar extends React.Component {
    render() {
        return (
            <NavBarB expand="lg" variant="light" bg="light" >
                <NavBarB.Brand href="#">Task Manager</NavBarB.Brand>
            </NavBarB>
        )
    }
}
export default Navbar;