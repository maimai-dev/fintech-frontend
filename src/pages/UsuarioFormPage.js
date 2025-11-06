import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const UsuarioFormPage = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const isEditing = Boolean(id); 

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            api.get(`/usuarios/${id}`)
                .then(response => {
                    setNome(response.data.nome);
                    setEmail(response.data.email);
                    setLoading(false);
                })
                .catch(err => {
                    alert('Erro ao buscar dados do usuário: ' + err.message);
                    setLoading(false);
                    navigate('/usuarios');
                });
        }
    }, [id, isEditing, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const usuarioData = { nome, email };

        try {
            if (isEditing) {
                await api.put(`/usuarios/${id}`, usuarioData);
                alert('Usuário atualizado com sucesso!');
            } else {
                await api.post('/usuarios', usuarioData);
                alert('Usuário criado com sucesso!');
            }
            setLoading(false);
            navigate('/usuarios'); 
        } catch (err) {
            setLoading(false);
            alert('Erro ao salvar usuário: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading && isEditing) return <p>Carregando dados...</p>;

    return (
        <div>
            <h2>{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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

export default UsuarioFormPage;