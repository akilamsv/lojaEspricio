const express = require('express');
const clienteRoutes = express.Router();
const {clienteController} = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.buscarTodosClientes);
clienteRoutes.post('/clientes', clienteController.incluirCliente);
clienteRoutes.get('/clientes/:idCliente', clienteController.buscarClientePorId);
clienteRoutes.put('/cliente/:idCliente', clienteController.atualizarCliente);
clienteRoutes.delete('/cliente/:idCliente', clienteController.excluirCliente)

module.exports = {clienteRoutes}