import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

import { Table, Button, Card, Spinner, Alert, Row, Col } from 'react-bootstrap';

const UsuarioListPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="text-light">Carregando usuários...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">Erro ao carregar usuários: {error}</Alert>;
    }

    return (
        <Card>
            <Card.Header>
                <Row className="align-items-center">
                    <Col>
                        <i className="bi bi-people-fill me-2"></i> 
                        Lista de Usuários
                    </Col>
                    <Col className="text-end">
                        <Button variant="primary" size="sm" onClick={() => navigate('/usuarios/novo')}>
                            <i className="bi bi-plus-circle me-2"></i>
                            Adicionar Usuário
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Table dark hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios?.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td className="text-center">
                                    <Button 
                                        variant="outline-secondary" 
                                        size="sm" 
                                        className="me-2"
                                        onClick={() => navigate(`/usuarios/editar/${usuario.id}`)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={() => handleDelete(usuario.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
            {usuarios?.length === 0 && (
                <Card.Footer className="text-muted text-center">
                    Nenhum usuário encontrado.
                </Card.Footer>
            )}
        </Card>
    );
};

export default UsuarioListPage;