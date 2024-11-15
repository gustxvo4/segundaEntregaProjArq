// livroService.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Função para listar todos os livros
const listarLivros = async () => {
    const { data, error } = await supabase.from('livros').select('*');
    if (error) {
        throw new Error('Erro ao listar livros: ' + error.message);
    }
    return data;
};

// Função para adicionar um novo livro
const adicionarLivro = async (titulo, categoria) => {
    const { data, error } = await supabase.from('livros').insert([{ titulo, categoria }]);
    if (error) {
        throw new Error('Erro ao adicionar livro: ' + error.message);
    }
    return data;
};

// Função para deletar um livro
const deletarLivro = async (id) => {
    const { data, error } = await supabase.from('livros').delete().eq('id', id);
    if (error) {
        throw new Error('Erro ao deletar livro: ' + error.message);
    }
    return data;
};

module.exports = {
    listarLivros,
    adicionarLivro,
    deletarLivro
};