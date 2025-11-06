import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const InvestimentoListPage = () => {
    const [investimentos, setInvestimentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/investimentos')
            .then(response => {
                setInvestimentos(response.data);
                setLoading(false);
            })
            .catch(err => {
                alert('Erro ao buscar investimentos: ' + err.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este investimento?')) {
            try {
                await api.delete(`/investimentos/${id}`);
                setInvestimentos(investimentos.filter(inv => inv.id !== id));
            } catch (err) {
                alert('Erro ao deletar investimento: ' + err.message);
            }
        }
    };

    if (loading) return <p>Carregando investimentos...</p>;

    return (
        <div>
            <h2>Investimentos</h2>
            <Link to="/investimentos/novo">
                <button style={{ marginBottom: '20px' }}>Novo Investimento</button>
            </Link>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Valor Aplicado</th>
                        <th>Data</th>
                        <th>Corretora</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {investimentos.map(inv => (
                        <tr key={inv.id}>
                            <td>{inv.id}</td>
                            <td>{inv.nome}</td>
                            <td>{inv.tipoInvestimento}</td>
                            <td>R$ {inv.valorAplicado.toFixed(2)}</td>
                            <td>{new Date(inv.dataAplicacao).toLocaleDateString()}</td>
                            <td>{inv.corretora}</td>
                            <td>{inv.usuario?.nome || 'N/A'}</td>
                            <td>
                                <Link to={`/investimentos/editar/${inv.id}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(inv.id)}>
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

export default InvestimentoListPage;