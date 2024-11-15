const express = require('express');
const emprestimoController = require('../controllers/emprestimoController');

const router = express.Router();

router.get('/', emprestimoController.listarEmprestimos);
router.post('/', emprestimoController.adicionarEmprestimo);  // POST pra adicionar
router.delete('/:id', emprestimoController.deletarEmprestimo);  

module.exports = router;
