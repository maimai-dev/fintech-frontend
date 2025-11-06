import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const CategoriaFormPage = () => {
    const [nome, setNome] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            api.get(`/categorias/${id}`)
                .then(response => setNome(response.data.nome))
                .catch(err => alert('Erro ao buscar categoria: ' + err.message));
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoriaData = { nome };

        try {
            if (isEditing) {
                await api.put(`/categorias/${id}`, categoriaData);
                alert('Categoria atualizada com sucesso!');
            } else {
                await api.post('/categorias', categoriaData);
                alert('Categoria criada com sucesso!');
            }
            navigate('/categorias');
        } catch (err) {
            alert('Erro ao salvar categoria: ' + err.message);
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Editar Categoria' : 'Nova Categoria'}</h2>
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
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default CategoriaFormPage;