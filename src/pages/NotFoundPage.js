import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            <h1>Erro 404 - Página Não Encontrada</h1>
            <p>A página que você está procurando não existe.</p>
            <Link to="/">Voltar para a Home</Link>
        </div>
    );
};

export default NotFoundPage;