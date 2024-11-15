// clienteService.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Função para listar todos os clientes
const listarClientes = async () => {
    const { data, error } = await supabase.from('clientes').select('*');
    if (error) {
        throw new Error('Erro ao listar clientes: ' + error.message);
    }
    return data;
};

// Função para adicionar um novo cliente
const adicionarCliente = async (nome, telefone) => {
    const { data, error } = await supabase.from('clientes').insert([{ nome, telefone }]);
    if (error) {
        throw new Error('Erro ao adicionar cliente: ' + error.message);
    }
    return data;
};

// Função para deletar um cliente
const deletarCliente = async (id) => {
    const { data, error } = await supabase.from('clientes').delete().eq('id', id);
    if (error) {
        throw new Error('Erro ao deletar cliente: ' + error.message);
    }
    return data;
};

module.exports = {
    listarClientes,
    adicionarCliente,
    deletarCliente
};