const mysql = require('mysql2/promise'); 
require('dotenv').config();

async function connectToDataBase(){
    try {
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST || 'localhost',
            user: process.env.DATABASE_USER || 'root',
            password: process.env.DATABASE_PASSWORD || "",
            database: process.env.DATABASE_NAME || "database",
        });
        
        console.log('Conexão bem sucedida com o banco de dados');
        return connection;
    } catch (error) {
        console.error("Erro ao conectar com o banco de dados:", error);
        throw error;
    }
}

module.exports = connectToDataBase();


