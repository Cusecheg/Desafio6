

const db = require('../database/db');

class OrderModel {
    async createOrder(body){
        const connection = await db;
        try {
            await connection.beginTransaction();

            const sell = await connection.execute('INSERT INTO vendas (client_id) values (?)', [body.client_id])
            const numberSell = sell[0].insertId;

            const productInserts = body.products.map( product => 

            connection.execute('INSERT INTO pedidos (venda_id, product_id, quantity, status_order) values (?,?,?,?)',[numberSell, product.product_id, product.quantity, "pending"])

            )
            await Promise.all(productInserts);

            const stockUpdates = body.products.map(product =>
                connection.execute('UPDATE estoque SET quantity = quantity - ? WHERE product_id = ?', [product.quantity, product.product_id])
            );

            await Promise.all(stockUpdates);

            const order = await connection.execute( `SELECT c.username AS client,
                p.name AS product,
                pe.quantity AS quantity,
                e.price AS price,
                pe.createdAt AS date_order
            FROM vendas v
            left JOIN pedidos pe ON v.id = pe.venda_id
            left JOIN produtos p ON pe.product_id = p.id
            left JOIN estoque e ON p.id = e.product_id
            left JOIN clientes c ON c.id = v.client_id
            WHERE v.id = ?`, [numberSell]);

            await connection.commit();
            return {status: 200, response: order[0], order_number: numberSell};
           
        } catch (error) {
            
            await connection.rollback();
            console.error('Erro ao criar pedido', error);
            return {status: 500, response: 'Erro ao realizar o pedido', error}
            
        }
    }
    async getOrders(){
        const connection = await db;
        try {
            const data = await connection.execute(`SELECT c.id AS client_id,
            c.username AS username,
            v.id AS order_number,
            pe.createdAt AS order_date,
            p.name AS product,
            pe.quantity AS quantity,
            e.price AS unitary_price
        FROM vendas v 
        left JOIN pedidos pe ON v.id = pe.venda_id
        left JOIN produtos p ON pe.product_id = p.id
        left JOIN estoque e ON p.id = e.product_id
        left JOIN clientes c ON c.id = v.client_id
        WHERE pe.product_id is not null
        order by order_date desc`);
        if (data[0].length > 0){
            return { status: 200, response: data[0]}
        }else{
            return { status: 400, response: 'Não se encontraram registros de pedidos!'}
        }
  
        } catch (error) {
            console.error('Erro ao obter os pedidos', error)
            return {status: 500, response: 'Erro ao obter os pedidos', error}
        }
    }
}

module.exports = new OrderModel();

