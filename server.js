const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'nome_do_banco_de_dados'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

app.get('/api/users', (req, res) => {
    connection.query('SELECT * FROM sua_tabela', (err, rows) => {
        if (err) {
            console.error('Erro ao executar consulta:', err);
            res.status(500).send('Erro ao buscar usuários');
            return;
        }
        res.json(rows);
    });
});

app.post('/api/users', (req, res) => {
    res.send('Usuário criado com sucesso');
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Usuário com o ID ${userId} atualizado com sucesso`);
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Usuário com o ID ${userId} excluído com sucesso`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});

