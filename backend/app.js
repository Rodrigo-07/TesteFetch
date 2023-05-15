const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/curriculo_db.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get('/usuarios', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM Pessoa';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO Pessoa (Nome, Sobrenome, Telefone, Genero, Email, Data_de_nascimento) VALUES ('" + req.body.nome + "', '" + req.body.sobrenome + "', " + req.body.telefone + " , '" + req.body.genero + "', '" + req.body.email + "', " + req.body.dataDeNascimento + ")";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaUsuario', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM Pessoa WHERE ID=" + req.query.userId;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);

	});
	db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE Pessoa SET Nome ='" + req.body.nome + "', Sobrenome = '" + req.body.sobrenome + "' , Telefone ='" + req.body.telefone + "' , Genero ='" + req.body.genero + "' , email ='" + req.body.email + "'  , Data_de_nascimento ='" + req.body.dataDeNascimento + "' WHERE ID='" + req.body.userId + "'";

	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM Pessoa WHERE ID='" + req.query.userId + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

// Retorna todos registros da formacao dos usuários (é o R do CRUD - Read)
app.get('/formacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT Nome, Instituicao, curso FROM Pessoa, Formacao WHERE Pessoa.ID = Formacao.ID_pessoa';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});


// Retorna todos registros da esperiencia dos usuários
app.get('/experiencia', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT Pessoa.Nome, Cargo, Empresa FROM Pessoa, Experiencia WHERE Pessoa.ID = Experiencia.ID_pessoa';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros da habilidade dos usuários
app.get('/habilidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT Nome, Habilidade FROM Pessoa, Habilidades WHERE Pessoa.ID = Habilidades.ID_pessoa';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros das realizações dos usuários
app.get('/realizacoes', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT Nome, Título FROM Pessoa, Realizacoes WHERE Pessoa.ID = Realizacoes.ID_pessoa';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros das personalidades dos usuários 
app.get('/personalidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT Nome, Traco_de_personalidade FROM Pessoa, Personalidades WHERE Pessoa.ID = Personalidades.ID_pessoa';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});


app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});