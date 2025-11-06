import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const RendaListPage = () => {
    const [rendas, setRendas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/rendas')
            .then(response => {
                setRendas(response.data);
                setLoading(false);
            })
            .catch(err => {
                alert('Erro ao buscar rendas: ' + err.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar esta renda?')) {
            try {
                await api.delete(`/rendas/${id}`);
                setRendas(rendas.filter(r => r.id !== id));
            } catch (err) {
                alert('Erro ao deletar renda: ' + err.message);
            }
        }
    };

    if (loading) return <p>Carregando rendas...</p>;

    return (
        <div>
            <h2>Rendas</h2>
            <Link to="/rendas/novo">
                <button style={{ marginBottom: '20px' }}>Nova Renda</button>
            </Link>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rendas.map(renda => (
                        <tr key={renda.id}>
                            <td>{renda.id}</td>
                            <td>{renda.descricao}</td>
                            <td>R$ {renda.valor.toFixed(2)}</td>
                            <td>{new Date(renda.data).toLocaleDateString()}</td>
                            <td>{renda.usuario?.nome || 'N/A'}</td>
                            <td>
                                <Link to={`/rendas/editar/${renda.id}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(renda.id)}>
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

export default RendaListPage;