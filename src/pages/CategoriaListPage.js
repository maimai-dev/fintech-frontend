import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const CategoriaListPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/categorias')
            .then(response => {
                setCategorias(response.data);
                setLoading(false);
            })
            .catch(err => {
                alert('Erro ao buscar categorias: ' + err.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar esta categoria?')) {
            try {
                await api.delete(`/categorias/${id}`);
                setCategorias(categorias.filter(cat => cat.id !== id));
            } catch (err) {
                alert('Erro ao deletar categoria: ' + err.message);
            }
        }
    };

    if (loading) return <p>Carregando categorias...</p>;

    return (
        <div>
            <h2>Categorias de Gastos</h2>
            <Link to="/categorias/novo">
                <button style={{ marginBottom: '20px' }}>Nova Categoria</button>
            </Link>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(categoria => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nome}</td>
                            <td>
                                <Link to={`/categorias/editar/${categoria.id}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(categoria.id)}>
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriaListPage;