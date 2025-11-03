const express = require('express');
const clienteRoutes = express.Router();
const {clienteController} = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.buscarTodosClientes);
clienteRoutes.post('/clientes', clienteController.incluirCliente);

module.exports = {clienteRoutes}