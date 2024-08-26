import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class Header extends Component {
    render () {
        const { isAuthenticated, username } = this.props.auth

 

        const authLinks = (
            

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Estadisticas</Nav.Link>
                    <Nav> <div style={{ backgroundColor: 'white', width:'100px'}}>:::</div> </Nav>
                    <Nav.Link href="/torneos">Torneos</Nav.Link>
                    <Nav.Link href="/equipos">Equipos</Nav.Link>
                    <Nav.Link href="/juegos">Juegos</Nav.Link>
                    <Nav.Link href="/rol">Nuevo Rol</Nav.Link>
                </Nav>
                
                <Nav> <div style={{ backgroundColor: 'white', width:'500px'}}>:::</div> </Nav>
                
                <Nav>
                    <Nav.Link href="#"><span><strong>{username ? `Usuario:  ${username}` : ""}</strong></span></Nav.Link>                    
                    <Nav.Link href="#" onClick={this.props.logout }>Salir</Nav.Link>                    
                </Nav>
            </Navbar.Collapse> 
        )



        const guestLinks = (
             

            <Navbar.Collapse id="responsive-navbar-nav">                
                <Nav> <div style={{ backgroundColor: 'white', width:'500px'}}>:::</div> </Nav>
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>                    
                </Nav>
            </Navbar.Collapse>            
            
        )


        return (
         

            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="/">Mi-Torneo</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            
                 {isAuthenticated 
                     ? authLinks
                     : guestLinks
                 }
            
            </Container>
            </Navbar>
        )
    }
}

const mapState = state => ({ auth: state.auth })

export default connect(mapState, {logout}) (Header)
