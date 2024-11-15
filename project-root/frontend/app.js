
const apiBaseUrl = 'http://localhost:5000/api';

// --- CLIENTE CRUD ---
async function getClientes() {
    const response = await fetch(`${apiBaseUrl}/clientes`);
    const clientes = await response.json();
    
    const clientesList = document.getElementById('clientesList');
    clientesList.innerHTML = '';

    if (clientes.length === 0) {
        clientesList.innerHTML = '<li class="list-group-item">Nenhum cliente encontrado</li>';
    } else {
        clientes.forEach(cliente => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `${cliente.id} - ${cliente.nome} - ${cliente.telefone} 
                            <button class="btn btn-danger btn-sm float-end" onclick="deletarCliente(${cliente.id})">Deletar</button>`;
            clientesList.appendChild(li);
        });
    }
}

// tratar a submissao de adicionar cliente
document.getElementById('addClientForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('clienteNome').value;
    const telefone = document.getElementById('clienteTelefone').value;

    const response = await fetch(`${apiBaseUrl}/clientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, telefone })
    });

    const data = await response.json();
    
    // mostrar sucesso ou erro
    const responseDiv = document.getElementById('response');
    if (response.ok) {
        responseDiv.innerHTML = '<div class="alert alert-success">Cliente adicionado com sucesso!</div>';
        getClientes();  
    } else {
        responseDiv.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
    }

    //  limpa formulario
    document.getElementById('clienteNome').value = '';
    document.getElementById('clienteTelefone').value = '';
});


async function deletarCliente(id) {
    const response = await fetch(`${apiBaseUrl}/clientes/${id}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    
    if (response.ok) {
        alert('Cliente deletado com sucesso!');
        getClientes();  
    } else {
        alert('Erro ao deletar cliente: ' + data.message);
    }
}

// --- LIVRO CRUD ---

async function getLivros() {
    const response = await fetch(`${apiBaseUrl}/livros`);
    const livros = await response.json();

    const livrosList = document.getElementById('livrosList');
    livrosList.innerHTML = '';

    if (livros.length === 0) {
        livrosList.innerHTML = '<li class="list-group-item">Nenhum livro encontrado</li>';
    } else {
        livros.forEach(livro => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `${livro.id} - ${livro.titulo} - ${livro.categoria} 
                            <button class="btn btn-danger btn-sm float-end" onclick="deletarLivro(${livro.id})">Deletar</button>`;
            livrosList.appendChild(li);
        });
    }
}


document.getElementById('addBookForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const titulo = document.getElementById('livroTitulo').value;
    const categoria = document.getElementById('livroCategoria').value;

    const response = await fetch(`${apiBaseUrl}/livros`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, categoria })
    });

    const data = await response.json();
    

    const responseDiv = document.getElementById('response');
    if (response.ok) {
        responseDiv.innerHTML = '<div class="alert alert-success">Livro adicionado com sucesso!</div>';
        getLivros();  
    } else {
        responseDiv.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
    }


    document.getElementById('livroTitulo').value = '';
    document.getElementById('livroCategoria').value = '';
});

async function deletarLivro(id) {
    const response = await fetch(`${apiBaseUrl}/livros/${id}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    
    if (response.ok) {
        alert('Livro deletado com sucesso!');
        getLivros();  
    } else {
        alert('Erro ao deletar livro: ' + data.message);
    }
}

// --- EMPRÉSTIMO CRUD ---

async function getEmprestimos() {
    const response = await fetch(`${apiBaseUrl}/emprestimos`);
    const emprestimos = await response.json();

    const emprestimosList = document.getElementById('emprestimosList');
    emprestimosList.innerHTML = '';

    if (emprestimos.length === 0) {
        emprestimosList.innerHTML = '<li class="list-group-item">Nenhum empréstimo encontrado</li>';
    } else {
        emprestimos.forEach(emprestimo => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `Cliente ID: ${emprestimo.cliente_id} - Livro ID: ${emprestimo.livro_id} - Status: ${emprestimo.status}
                            <button class="btn btn-danger btn-sm float-end" onclick="deletarEmprestimo(${emprestimo.id})">Deletar</button>`;
            emprestimosList.appendChild(li);
        });
    }
}

document.getElementById('addLoanForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const clienteId = document.getElementById('clienteId').value;
    const livroId = document.getElementById('livroId').value;
    const status = document.getElementById('status').value;

    // mandar pra api do back
    const response = await fetch(`${apiBaseUrl}/emprestimos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cliente_id: clienteId,  
            livro_id: livroId,      
            status
        })
    });

    const data = await response.json();
    
   
    const responseDiv = document.getElementById('response');
    if (response.ok) {
        responseDiv.innerHTML = '<div class="alert alert-success">Empréstimo adicionado com sucesso!</div>';
        getEmprestimos();  
    } else {
        responseDiv.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
    }

   
    document.getElementById('clienteId').value = '';
    document.getElementById('livroId').value = '';
    document.getElementById('status').value = 'ativo';
});


async function deletarEmprestimo(id) {
    const response = await fetch(`${apiBaseUrl}/emprestimos/${id}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    
    if (response.ok) {
        alert('Empréstimo deletado com sucesso!');
        getEmprestimos(); 
    } else {
        alert('Erro ao deletar empréstimo: ' + data.message);
    }
}


window.onload = () => {
    getClientes();
    getLivros();
    getEmprestimos();
};
