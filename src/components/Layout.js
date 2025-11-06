import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';

import { Navbar, Container, Nav, Collapse } from 'react-bootstrap';

const Layout = () => {
    return (
        <>

            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
                <Container fluid>
                    <Navbar.Brand as={RouterLink} to="/">
                        <i className="bi bi-wallet2"></i> Finanças Sênior
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="ms-auto">
                            <Nav.Link as={RouterLink} to="/">Visão Geral</Nav.Link>
                            <Nav.Link as={RouterLink} to="/gastos">Gastos</Nav.Link>
                            <Nav.Link as={RouterLink} to="/rendas">Rendas</Nav.Link>
                            <Nav.Link as={RouterLink} to="/investimentos">Investimentos</Nav.Link>
                            <Nav.Link as={RouterLink} to="/categorias">Categorias</Nav.Link>
                            <Nav.Link as={RouterLink} to="/login" className="text-danger">
                                <i className="bi bi-box-arrow-right"></i> Sair
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;