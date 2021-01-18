import React from 'react'
import {Navbar, Nav} from "react-bootstrap";
import logo from '../logo.png'


export const Header: React.FC = () => {
    return (
        <Navbar variant="light" expand="md" className="header">
                <Navbar.Brand href="#home">
                    <div className="center"> <img src={logo} width={50} className='logo' alt='taxi logo'/>
                        <br/>
                        <span className="badge">Ижевск</span></div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    <Nav className="mr-au">
                        <Nav.Link href="/">Клиентам</Nav.Link>
                        <Nav.Link href="/">Водителям</Nav.Link>
                        <Nav.Link href="/">О Нас</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}
