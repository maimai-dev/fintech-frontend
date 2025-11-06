import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UsuarioListPage from './pages/UsuarioListPage';
import UsuarioFormPage from './pages/UsuarioFormPage';
import GastoListPage from './pages/GastoListPage'; 
import RendaListPage from './pages/RendaListPage'; 
import NotFoundPage from './pages/NotFoundPage';
import './App.css'; 

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="usuarios" element={<UsuarioListPage />} />
                    <Route path="usuarios/novo" element={<UsuarioFormPage />} />
                    <Route path="usuarios/editar/:id" element={<UsuarioFormPage />} />
                    
                    <Route path="gastos" element={<GastoListPage />} />
                    <Route path="rendas" element={<RendaListPage />} />
                    
                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;