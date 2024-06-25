# Node.js Express MySQL Application

Este é um projeto de exemplo de uma aplicação Node.js utilizando Express e MySQL2. A aplicação permite gerenciar produtos, estoque, clientes, vendas e pedidos.

## Pré-requisitos

- Node.js (v14.x ou superior)
- npm (v6.x ou superior)
- MySQL (v5.7 ou superior)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

2. Instale as deprendências:
npm install

3. Crie um banco de dados MySQL e as tabelas necessárias. Execute os seguintes comandos SQL:

CREATE DATABASE nome_do_banco_de_dados;

USE nome_do_banco_de_dados;

CREATE TABLE produtos (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL UNIQUE,
  description VARCHAR(200),
  soft_delete BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE estoque (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  price DECIMAL(10, 2),
  quantity INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES produtos(id)
);

CREATE TABLE clientes(
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(200) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

CREATE TABLE vendas(
  id INT NOT NULL AUTO_INCREMENT,
  client_id INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (client_id) REFERENCES clientes(id)
);

CREATE TABLE pedidos(
  id INT NOT NULL AUTO_INCREMENT,
  client_id INT NOT NULL,
  venda_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status_order ENUM("pending", "in_process", "send", "delivered"),
  PRIMARY KEY(id),
  FOREIGN KEY (venda_id) REFERENCES vendas(id),
  FOREIGN KEY (product_id) REFERENCES produtos(id)
);
```
![Modelo de Datos](https://github.com/Cusecheg/Desafio6/raw/af595e7aa8411f5f542c37afbd87275b99c8bca8/src/modelOfData.png)


4. Crie um arquivo .env na raiz do projeto e configure suas variáveis de ambiente:

DATABASE_HOST=localhost
DATABASE_PASSWORD="sua_senha"
DATABASE_USER="seu_usuario"
DATABASE_NAME="nome_do_banco_de_dados"

5. Inicie a aplicação:

npm start

Estrutura do Projeto:
1. app.js: Configuração de middlewares.
2. index.js: Arquivo principal da aplicação (Inicialização do servidor).
3. database/db.js: Conexão com o banco de dados.
4. routes/api/index.js: Contém as definições de rotas da aplicação.
5. models/: Contém os modelos que interagem com o banco de dados.
6. controllers/: Contém os controladores que lidam com a lógica de negócios.
7. services/: Contém o tratamento de dados obtidos desde a base de datos!
8. models/: Contém os modelos que interagem com o banco de dados.

Endpoints da Api

Produtos

*   GET http://localhost:3000/api/product/all   (Lista todos os produtos)
*   GET http://localhost:3000/api/product/600   (Lista  um produto pelo id)
*   POST http://localhost:3000/api/product      (Cria um novo produto)
Corpo da requisiçaõ:
    {
            "name": "Queso Telita",
            "description": "",
            "price": 45,
            "quantity": 8000
    }
*   PUT http://localhost:3000/api/product/      (Atualiza um produto)
Corpo da requisição:
	{
		"product_id": 4,
		"name": "Catalina",
		"description": "Catalina suculenta",
		"price": 28.9,
		"quantity": 100
	}
*   PUT http://localhost:3000/api/product/1     (Realiza um soft delete de um produto pelo id)


Clientes

*   PUT http://localhost:3000/api/client        (Cadastro de clientes)

Corpo da requisiçaõ:
    {
            "username": "Scarlet Useche",
            "email": "usechescarlet7@gmail.com",
            "password": "1234"
    }

Pedidos

*   PUT http://localhost:3000/api/order     (Realizar um pedido)

Corpo da requisição:
    {
        "client_id": 69,
        "products": [
            {
                "product_id": 4,
                            "quantity": 100
            },
                {
                "product_id": 2,
                "quantity": 5
            }
        ]
    }

Vendas

* GET http://localhost:3000/api/order       (Obter um resumo de vendas)


