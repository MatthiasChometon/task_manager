import React from "react";
import NavBarB from 'react-bootstrap/NavBar';

const Navbar = () => (
    <NavBarB expand="lg" variant="light" bg="light">
        <NavBarB.Brand href="#">Task Manager</NavBarB.Brand>
    </NavBarB>
);

export default Navbar;