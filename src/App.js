import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

import UsuarioListPage from './pages/UsuarioListPage';
import UsuarioFormPage from './pages/UsuarioFormPage';

import CategoriaListPage from './pages/CategoriaListPage';
import CategoriaFormPage from './pages/CategoriaFormPage';

import GastoListPage from './pages/GastoListPage';
import GastoFormPage from './pages/GastoFormPage'; 

import RendaListPage from './pages/RendaListPage';
import RendaFormPage from './pages/RendaFormPage'; 

import InvestimentoListPage from './pages/InvestimentoListPage';
import InvestimentoFormPage from './pages/InvestimentoFormPage'; 


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas com o Layout (barra de navegação) */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    
                    {/* Usuários */}
                    <Route path="usuarios" element={<UsuarioListPage />} />
                    <Route path="usuarios/novo" element={<UsuarioFormPage />} />
                    <Route path="usuarios/editar/:id" element={<UsuarioFormPage />} />
                    
                    {/* Categorias */}
                    <Route path="categorias" element={<CategoriaListPage />} />
                    <Route path="categorias/novo" element={<CategoriaFormPage />} />
                    <Route path="categorias/editar/:id" element={<CategoriaFormPage />} />

                    {/* Gastos */}
                    <Route path="gastos" element={<GastoListPage />} />
                    <Route path="gastos/novo" element={<GastoFormPage />} />
                    <Route path="gastos/editar/:id" element={<GastoFormPage />} />
                    
                    {/* Rendas */}
                    <Route path="rendas" element={<RendaListPage />} />
                    <Route path="rendas/novo" element={<RendaFormPage />} />
                    <Route path="rendas/editar/:id" element={<RendaFormPage />} />

                    {/* Investimentos */}
                    <Route path="investimentos" element={<InvestimentoListPage />} />
                    <Route path="investimentos/novo" element={<InvestimentoFormPage />} />
                    <Route path="investimentos/editar/:id" element={<InvestimentoFormPage />} />
                    
                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Rota sem o Layout */}
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;