// livroController.js
const livroService = require('../services/livroService');

// Função para listar todos os livros
const listarLivros = async (req, res) => {
    try {
        const livros = await livroService.listarLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para adicionar um novo livro
const adicionarLivro = async (req, res) => {
    try {
        const { titulo, categoria } = req.body;
        const livro = await livroService.adicionarLivro(titulo, categoria);
        res.status(201).json(livro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para deletar um livro
const deletarLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await livroService.deletarLivro(id);
        res.status(200).json({ message: 'Livro deletado com sucesso!', livro });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarLivros,
    adicionarLivro,
    deletarLivro
};