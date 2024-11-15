// clienteController.js
const clienteService = require('../services/clienteService');

// Função para listar todos os clientes
const listarClientes = async (req, res) => {
    try {
        const clientes = await clienteService.listarClientes();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para adicionar um novo cliente
const adicionarCliente = async (req, res) => {
    try {
        const { nome, telefone } = req.body;
        const cliente = await clienteService.adicionarCliente(nome, telefone);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para deletar um cliente
const deletarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clienteService.deletarCliente(id);
        res.status(200).json({ message: 'Cliente deletado com sucesso!', cliente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarClientes,
    adicionarCliente,
    deletarCliente
};
