import React from 'react';

import { Row, Col, Card } from 'react-bootstrap';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const dadosGastos = {
    labels: ['Comida', 'Transporte', 'Contas', 'Lazer', 'Moradia', 'Outros'],
    datasets: [{
        label: 'Gastos por Categoria',
        data: [850, 420, 950, 380, 1200, 400], 
        backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: '#343a40', 
        borderWidth: 2
    }]
};

const optionsGastos = {
    indexAxis: 'y',
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
        x: { ticks: { color: '#f8f9fa' }, grid: { color: '#495057' } },
        y: { ticks: { color: '#f8f9fa' }, grid: { color: '#495057' } }
    }
};

const dadosTendencia = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
        {
            label: 'Gastos Totais',
            data: [3500, 3300, 3400, 3100, 2900, 3200],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4
        },
        {
            label: 'Receita Total',
            data: [5000, 5000, 4800, 5100, 5000, 5200],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.4
        }
    ]
};

const optionsTendencia = {
    responsive: true,
    plugins: { legend: { labels: { color: '#f8f9fa' } } },
    scales: {
        x: { ticks: { color: '#f8f9fa' }, grid: { color: '#495057' } },
        y: { ticks: { color: '#f8f9fa' }, grid: { color: '#495057' } }
    }
};


const HomePage = () => {
    const rendaTotal = 5000;
    const gastosTotais = 3200;
    const economias = rendaTotal - gastosTotais;

    return (
        <Row>
            <Col lg={8}>
                <Card className="mb-4">
                    <Card.Header><i className="bi bi-pie-chart-fill"></i> Visão Geral</Card.Header>
                    <Card.Body>
                        <Row className="text-center">
                            <Col md={4}>
                                <div className="stat-card p-3">
                                    <h3><i className="bi bi-arrow-up-circle-fill text-success"></i> Renda Total</h3>
                                    <p className="text-success">R${rendaTotal.toFixed(2)}</p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="stat-card p-3">
                                    <h3><i className="bi bi-arrow-down-circle-fill text-danger"></i> Gastos</h3>
                                    <p className="text-danger">R${gastosTotais.toFixed(2)}</p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="stat-card p-3">
                                    <h3><i className="bi bi-piggy-bank-fill text-info"></i> Economias</h3>
                                    <p className="text-info">R${economias.toFixed(2)}</p>
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <h5 className="mt-4">Resumo Gráfico dos Gastos</h5>
                        <Bar data={dadosGastos} options={optionsGastos} />
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Header><i className="bi bi-graph-down-arrow"></i> Dashboard de Gastos</Card.Header>
                    <Card.Body>
                        <h5>Tendência de Gastos Mensais</h5>
                        <Line data={dadosTendencia} options={optionsTendencia} />
                    </Card.Body>
                </Card>
            </Col>

            <Col lg={4}>
                <Card className="mb-4">
                    <Card.Header><i className="bi bi-bullseye"></i> Objetivos Financeiros</Card.Header>
                    <Card.Body>
                        <p>Funcionalidade de Objetivos a ser implementada.</p>
                    </Card.Body>
                </Card>

                <Card className="mb-4">
                    <Card.Header><i className="bi bi-plus-circle-fill"></i> Adicionar Novo Gasto</Card.Header>
                    <Card.Body>
                        <p>Formulário de adicionar gasto a ser implementado.</p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default HomePage;