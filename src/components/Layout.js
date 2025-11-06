import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
                <Link to="/usuarios" style={{ marginRight: '15px' }}>Usuários</Link>
                <Link to="/gastos" style={{ marginRight: '15px' }}>Gastos</Link>
                <Link to="/rendas" style={{ marginRight: '15px' }}>Rendas</Link>
                <Link to="/login" style={{ float: 'right' }}>Logout (Simulado)</Link>
            </nav>
            <hr />
            <main style={{ padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;