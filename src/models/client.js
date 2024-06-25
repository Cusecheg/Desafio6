const db = require('../database/db');

class ClientModel {
    
    async create(body){
        const connectionDb = await db
        try {
            await connectionDb.beginTransaction();
            const data = await connectionDb.execute(`INSERT INTO clientes (username, email, password) VALUES (?, ?, ?)`, [body.username, body.email, body.password]);
            await connectionDb.commit();
            if (data[0].insertId){
                return {status: 200, response: data[0].insertId}
            }else{
                await connectionDb.rollback();
                return {status: 400, response: 'Não foi possivel cadastrar usuario!'}
            }         

        } catch (error) {
            await connectionDb.rollback();

            return {status: 500, response: 'Erro ao cadastrar cliente!' };
        }
    }

    async getClient(email){
        const connectionDb = await db
     
        try {
            const data = await connectionDb.execute(`SELECT email FROM clientes WHERE email = ?`, [email]);
            if (data[0].length > 0) {
                return { status: 200, response: data[0][0] }; 
            } else {
                return { status: 404, response: null }; 
            }
        } catch (error) {
            return {status: 500, response: 'Erro ao obter cliente!' };
        }
    }

}


module.exports = new ClientModel();
