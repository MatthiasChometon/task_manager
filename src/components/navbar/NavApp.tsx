import React from "react";
import { Nav, Navbar } from 'react-bootstrap';

class NavApp extends React.Component {
    render() {
        return (
            <Navbar id="navbar" bg="light" variant="light">
                <Navbar.Brand href="/">Tasks Manager</Navbar.Brand>
                {window.screen.width < 900 &&
                    <Nav className="mr-auto">
                        <Nav.Link href="/tasks/inprogress">in progress</Nav.Link>
                        <Nav.Link href="/tasks/completed">completed</Nav.Link>
                        <Nav.Link href="/theme">theme</Nav.Link>
                    </Nav>}
                {window.screen.width > 900 &&
                    <Nav className="mr-auto">
                        <Nav.Link href="/tasks/all">tasks</Nav.Link>
                        <Nav.Link href="/theme">theme</Nav.Link>
                    </Nav>}
            </Navbar>
        )
    }
}
export default NavApp;