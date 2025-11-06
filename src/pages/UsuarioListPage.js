import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import { Link } from 'react-router-dom';

const UsuarioListPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await api.get('/usuarios');
                setUsuarios(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []); 

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
            try {
                await api.delete(`/usuarios/${id}`);
                setUsuarios(usuarios.filter(user => user.id !== id));
            } catch (err) {
                alert('Erro ao deletar usuário: ' + err.message);
            }
        }
    };

    if (loading) return <p>Carregando usuários...</p>;
    if (error) return <p>Erro ao carregar usuários: {error}</p>;

    return (
        <div>
            <h2>Lista de Usuários</h2>
            <Link to="/usuarios/novo">
                <button style={{ marginBottom: '20px' }}>Adicionar Novo Usuário</button>
            </Link>
            <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <Link to={`/usuarios/editar/${usuario.id}`}>
                                    <button style={{ marginRight: '5px' }}>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(usuario.id)}>
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

export default UsuarioListPage;