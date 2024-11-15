// clienteRoutes.js
const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/', clienteController.listarClientes);
router.post('/', clienteController.adicionarCliente);
router.delete('/:id', clienteController.deletarCliente);  // DELETE route for cliente

module.exports = router;