import React from "react";
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./NavApp.scss";

class NavApp extends React.Component {
    render() {
        return (
            <Navbar id="navbar" >
                <Link to="/"> <Navbar.Brand className="mr-0">Tasks Manager</Navbar.Brand></Link>
                {window.screen.width < 900 &&
                    <Nav className="mr-auto">
                        <Link to="/tasks/inprogress">progress</Link>
                        <Link to="/tasks/completed">completed</Link>
                        <Link to="/theme">theme</Link>
                    </Nav>}
                {window.screen.width > 900 &&
                    <Nav className="mr-auto">
                        <Link to="/tasks/all">tasks</Link>
                        <Link to="/theme">theme</Link>
                    </Nav>}
            </Navbar>
        )
    }
}
export default NavApp;