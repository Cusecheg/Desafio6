const db = require('../database/db')

class ProductModel {
    async create(body){
        const connectionDb = await db;
        try {
            await connectionDb.beginTransaction();
            const productData = await connectionDb.execute(`INSERT INTO produtos (name, description) values (?,?)`, [body.name, body.description]);
            const productId = productData[0].insertId;

            await connectionDb.execute(`INSERT INTO estoque (product_id, price, quantity) values(?,?,?)`, [productId, body.price, body.quantity]);

            await connectionDb.commit();
    
            return {status: 200, response: `Produto cadastrado com sucesso! id:${productId}`}
            
        } catch (error) {
            await connectionDb.rollback();

            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 400, response: `O produto de nome '${body.name}' já existe!` };
            } else {
                throw { status: 500, response: 'Erro ao cadastrar produto!', error };
            }
            
        }
    }

    async getAll(){
        const connectionDb = await db;

        try {
            const products = await connectionDb.execute(`SELECT * FROM produtos p
                JOIN estoque e on p.id = e.product_id
                WHERE p.soft_delete = false`);

            return {status: 200, response: products[0]}

        } catch (error) {
            throw {status: 500, response: 'Erro ao obter os produtos!', error}
        }
    }

    async getById(productId){
        const connectionDb = await db;
        try {
            const product = await connectionDb.execute(`SELECT * FROM produtos p
            JOIN estoque e on p.id = e.product_id
            where p.id = ? and p.soft_delete = false`, [productId]);
            return product[0]
        } catch (error) {
            throw {status: 500, response: `Erro ao obter o produto de id:${productId}!`, error}
        }
    }

    async softDeleteById(productId){
        const connection = await db;
        try {
            const softDelete = await connection.execute(`UPDATE produtos
            set soft_delete = true WHERE id = ?`, [productId]);
                 
             return {status: 200, response: softDelete[0]}
        } catch (error) {
            throw {status: 500, response: `Erro ao apagar o produto de id:${productId}!`, error}
        }
    }

    async update(data){
        const connection = await db;
        try {
           const response = await connection.execute(`UPDATE produtos p
                JOIN estoque e ON p.id = e.product_id
                SET p.name = ?,
                p.description = ?,
                p.soft_delete = false,
                e.price = ?,
                e.quantity = ?
                where p.id = ?`, [data.name, data.description, data.price, data.quantity, data.product_id]);

                return response

        } catch (error) {
            throw {status: 500, response: `Erro ao autualizar o produto de id:${data.product_id}!`, error}
        }
    }

    async getByName(name){
        const connection = await db
        try {
            const productName = await connection.execute(`SELECT p.name, p.id FROM produtos p WHERE p.name = ?`, [name])
    
            return {status: 200, response: productName[0]}
        } catch (error) {
            throw {status: 500, response: 'Erro ao verificar nome, para a criação do produto!', error}
        }
    }
}

module.exports = new ProductModel();