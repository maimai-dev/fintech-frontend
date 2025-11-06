import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const RendaFormPage = () => {
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
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
            api.get(`/rendas/${id}`)
                .then(response => {
                    const renda = response.data;
                    setValor(renda.valor);
                    setData(renda.data.split('T')[0]);
                    setDescricao(renda.descricao);
                    setUsuarioId(renda.usuario?.id || '');
                    setLoading(false);
                })
                .catch(err => {
                    alert('Erro ao buscar renda: ' + err.message);
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const rendaData = {
            valor,
            data,
            descricao,
            usuario: { id: usuarioId }
        };

        try {
            if (isEditing) {
                await api.put(`/rendas/${id}`, rendaData);
                alert('Renda atualizada com sucesso!');
            } else {
                await api.post('/rendas', rendaData);
                alert('Renda criada com sucesso!');
            }
            setLoading(false);
            navigate('/rendas');
        } catch (err) {
            setLoading(false);
            alert('Erro ao salvar renda: ' + (err.response?.data || err.message));
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <h2>{isEditing ? 'Editar Renda' : 'Nova Renda'}</h2>
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
                    <label>Valor (R$):</label>
                    <input
                        type="number"
                        step="0.01"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Data:</label>
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
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

export default RendaFormPage;