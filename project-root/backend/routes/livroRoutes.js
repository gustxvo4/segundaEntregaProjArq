// livroRoutes.js
const express = require('express');
const livroController = require('../controllers/livroController');

const router = express.Router();

router.get('/', livroController.listarLivros);
router.post('/', livroController.adicionarLivro);
router.delete('/:id', livroController.deletarLivro);  

module.exports = router;