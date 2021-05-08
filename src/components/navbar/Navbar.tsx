import React from "react";
import { Nav } from "react-bootstrap";
import NavbarB from 'react-bootstrap/NavBar';

class Navbar extends React.Component {
    render() {
        return (
            <NavbarB id="navbar" bg="light" variant="light">
                <NavbarB.Brand href="#home">Tasks Manager</NavbarB.Brand>
                {window.screen.width < 900 &&
                    <Nav className="mr-auto">
                        <Nav.Link href="/tasks/inprogress">in progress</Nav.Link>
                        <Nav.Link href="/tasks/completed">completed</Nav.Link>
                    </Nav>}
            </NavbarB>
        )
    }
}
export default Navbar;

let navbar = document.getElementById("navbar");
let lastScrollValue = 0;

document.addEventListener('scroll', () => {
    let top = document.documentElement.scrollTop;
    if (navbar !== null) {
        console.log(navbar)
        if (lastScrollValue < top) {
            navbar.classList.add("hidden");
        } else {
            navbar.classList.remove("hidden");
        }
    }
    lastScrollValue = top;
});