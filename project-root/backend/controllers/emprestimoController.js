const emprestimoService = require('../services/emprestimoService');

// Função para adicionar um novo empréstimo
const adicionarEmprestimo = async (req, res) => {
    try {
        const { cliente_id, livro_id, status, data_devolucao } = req.body;

        const emprestimoData = {
            cliente_id,
            livro_id,
            status: status || 'ativo', 
            data_devolucao: data_devolucao || null, 
        };

        const emprestimo = await emprestimoService.adicionarEmprestimo(emprestimoData);
        res.status(201).json(emprestimo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await emprestimoService.listarEmprestimos();
        res.json(emprestimos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para deletar um empréstimo
const deletarEmprestimo = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await emprestimoService.deletarEmprestimo(id);
        res.status(200).json({ message: 'Empréstimo deletado com sucesso!', emprestimo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarEmprestimos,
    adicionarEmprestimo,
    deletarEmprestimo
};