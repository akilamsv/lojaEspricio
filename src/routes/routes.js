const express = require('express');
const router = express.Router();

// ReferÊncia do arquivo de rotas
const {produtoRoutes} = require('./produtoRoutes');
const {clienteRoutes} = require('./clienteRoutes');

router.use('/', produtoRoutes, clienteRoutes);


module.exports = { router };