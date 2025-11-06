import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const InvestimentoFormPage = () => {
    const [nome, setNome] = useState('');
    const [tipoInvestimento, setTipoInvestimento] = useState('');
    const [valorAplicado, setValorAplicado] = useState('');
    const [dataAplicacao, setDataAplicacao] = useState('');
    const [corretora, setCorretora] = useState('');
    const [usuarioId, setUsuarioId] = useState('');

    const [usuarios, setUsuarios] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    useEffect(() => {
        api.get('/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(err => alert('Erro ao carregar usuários: ' + err.message));
    }, []);

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            api.get(`/investimentos/${id}`)
                .then(response => {
                    const inv = response.data;
                    setNome(inv.nome);
                    setTipoInvestimento(inv.tipoInvestimento);
                    setValorAplicado(inv.valorAplicado);
                    setDataAplicacao(inv.dataAplicacao.split('T')[0]);
                    setCorretora(inv.corretora);
                    setUsuarioId(inv.usuario?.id || '');
                    setLoading(false);
                })
                .catch(err => {
                    alert('Erro ao buscar investimento: ' + err.message);
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const investimentoData = {
            nome,
            tipoInvestimento,
            valorAplicado,
            dataAplicacao,
            corretora,
            usuario: { id: usuarioId }
        };

        try {
            if (isEditing) {
                await api.put(`/investimentos/${id}`, investimentoData);
                alert('Investimento atualizado com sucesso!');
            } else {
                await api.post('/investimentos', investimentoData);
                alert('Investimento criado com sucesso!');
            }
            setLoading(false);
            navigate('/investimentos');
        } catch (err) {
            setLoading(false);
            alert('Erro ao salvar investimento: ' + (err.response?.data || err.message));
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <h2>{isEditing ? 'Editar Investimento' : 'Novo Investimento'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Usuário:</label>
                    <select
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    >
                        <option value="">Selecione um usuário</option>
                        {usuarios.map(user => (
                            <option key={user.id} value={user.id}>{user.nome}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Nome do Investimento:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Tipo (Ex: Ação, Renda Fixa):</label>
                    <input
                        type="text"
                        value={tipoInvestimento}
                        onChange={(e) => setTipoInvestimento(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Valor Aplicado (R$):</label>
                    <input
                        type="number"
                        step="0.01"
                        value={valorAplicado}
                        onChange={(e) => setValorAplicado(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Data da Aplicação:</label>
                    <input
                        type="date"
                        value={dataAplicacao}
                        onChange={(e) => setDataAplicacao(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Corretora:</label>
                    <input
                        type="text"
                        value={corretora}
                        onChange={(e) => setCorretora(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </form>
        </div>
    );
};

export default InvestimentoFormPage;