import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const GastoFormPage = () => {
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [usuarioId, setUsuarioId] = useState('');


    const [categorias, setCategorias] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catResponse, userResponse] = await Promise.all([
                    api.get('/categorias'),
                    api.get('/usuarios')
                ]);
                setCategorias(catResponse.data);
                setUsuarios(userResponse.data);
            } catch (err) {
                alert('Erro ao carregar dados de suporte (usuários/categorias). ' + err.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            api.get(`/gastos/${id}`)
                .then(response => {
                    const gasto = response.data;
                    setValor(gasto.valor);
                    setData(gasto.data.split('T')[0]); 
                    setDescricao(gasto.descricao);
                    setCategoriaId(gasto.categoria?.id || '');
                    setUsuarioId(gasto.usuario?.id || '');
                    setLoading(false);
                })
                .catch(err => {
                    alert('Erro ao buscar gasto: ' + err.message);
                    setLoading(false);
                });
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const gastoData = {
            valor,
            data,
            descricao,
            categoria: { id: categoriaId },
            usuario: { id: usuarioId }
        };

        try {
            if (isEditing) {
                await api.put(`/gastos/${id}`, gastoData);
                alert('Gasto atualizado com sucesso!');
            } else {
                await api.post('/gastos', gastoData);
                alert('Gasto criado com sucesso!');
            }
            setLoading(false);
            navigate('/gastos');
        } catch (err) {
            setLoading(false);
            alert('Erro ao salvar gasto: ' + (err.response?.data || err.message));
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <h2>{isEditing ? 'Editar Gasto' : 'Novo Gasto'}</h2>
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
                    <label>Categoria:</label>
                    <select
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
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

export default GastoFormPage;