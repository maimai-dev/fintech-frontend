import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const GastoListPage = () => {
    const [gastos, setGastos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/gastos')
            .then(response => {
                setGastos(response.data);
                setLoading(false);
            })
            .catch(err => {
                alert('Erro ao buscar gastos: ' + err.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este gasto?')) {
            try {
                await api.delete(`/gastos/${id}`);
                setGastos(gastos.filter(g => g.id !== id));
            } catch (err) {
                alert('Erro ao deletar gasto: ' + err.message);
            }
        }
    };

    if (loading) return <p>Carregando gastos...</p>;

    return (
        <div>
            <h2>Gastos</h2>
            <Link to="/gastos/novo">
                <button style={{ marginBottom: '20px' }}>Novo Gasto</button>
            </Link>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Categoria</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {gastos.map(gasto => (
                        <tr key={gasto.id}>
                            <td>{gasto.id}</td>
                            <td>{gasto.descricao}</td>
                            <td>R$ {gasto.valor.toFixed(2)}</td>
                            <td>{new Date(gasto.data).toLocaleDateString()}</td>
                            <td>{gasto.categoria?.nome || 'N/A'}</td>
                            <td>{gasto.usuario?.nome || 'N/A'}</td>
                            <td>
                                <Link to={`/gastos/editar/${gasto.id}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(gasto.id)}>
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

export default GastoListPage;