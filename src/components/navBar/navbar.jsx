import React from "react";
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom'
import './style.css'

export default function NavBar(){
    const navigate = useNavigate()
    function Navegar(rota) {
        navigate(rota)
        window.location.reload()
    }
        
    return(
        <Navbar className="navClass" sticky="top" >
        <Container>
          <Navbar.Brand href="#home">Movie Lib</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={(e)=> Navegar('/')}>Home</Nav.Link>
              <Nav.Link onClick={(e)=> Navegar('/moviegenres')}>Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    )
}