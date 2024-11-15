const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  
dotenv.config();
const clienteRoutes = require('./routes/clienteRoutes');
const livroRoutes = require('./routes/livroRoutes');
const emprestimoRoutes = require('./routes/emprestimoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// habilitar CORS para todas as rotas
app.use(cors());  

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Gestão de Biblioteca!');
});

// API rotas
app.use('/api/clientes', clienteRoutes);
app.use('/api/livros', livroRoutes);
app.use('/api/emprestimos', emprestimoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
