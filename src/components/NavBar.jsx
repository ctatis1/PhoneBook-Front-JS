import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">PhoneBook</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span">
                            <Link style={{color:'white'}} to="/">Home</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={{color:'white'}} to="/contacts">Contacts</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={{color:'white'}} to="/users">Users</Link>
                        </Nav.Link>
                        {/* <Nav.Link href="#" as="span">
                            {user
                            ? <em>{user} logged in</em>
                            : <Link to="/login">login</Link>
                            }
                        </Nav.Link> */}
                    </Nav>
                
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
