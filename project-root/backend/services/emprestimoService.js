const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Função para listar todos os empréstimos
const listarEmprestimos = async () => {
    const { data, error } = await supabase.from('emprestimos').select('*');
    if (error) {
        throw new Error('Erro ao listar empréstimos: ' + error.message);
    }
    return data;
};

// Função para adicionar um novo empréstimo
const adicionarEmprestimo = async (emprestimoData) => {
    const { cliente_id, livro_id, status, data_devolucao } = emprestimoData;

    const { data, error } = await supabase.from('emprestimos').insert([
        {
            cliente_id,
            livro_id,
            status,          
            data_devolucao,   
        }
    ]);

    if (error) {
        throw new Error('Erro ao adicionar empréstimo: ' + error.message);
    }

    return data;
};

// Função para deletar um empréstimo
const deletarEmprestimo = async (id) => {
    const { data, error } = await supabase.from('emprestimos').delete().eq('id', id);
    if (error) {
        throw new Error('Erro ao deletar empréstimo: ' + error.message);
    }
    return data;
};

module.exports = {
    listarEmprestimos,
    adicionarEmprestimo,
    deletarEmprestimo
};
