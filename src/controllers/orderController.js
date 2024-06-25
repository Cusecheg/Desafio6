
const OrderService = require('../services/orderService');

class OrderController {

    async createOrder(req, res) {
        try {
            const data = req.body
            if (!Number.isInteger(data.client_id) || data.client_id <= 0) {
                return res.status(400).send('Erro ao realizar o pedido. O client_id precisa ser um número inteiro positivo!');
            }
    
            for (const product of data.products) {
                if (!Number.isInteger(product.product_id) || product.product_id <= 0 || !Number.isInteger(product.quantity) || product.quantity <= 0) {
                    return res.status(400).send('Erro ao realizar o pedido. Confira os dados de entrada, eles precisam ser números inteiros, positivos!');
                }
            }


            const register = await OrderService.createOrder(data)
            return res.status(register.status).send(register.response)

        } catch (error) {
            console.error('Erro ao realizar o pedido', error);
            return res.status(500).send('Erro interno do servidor');
        }

    }

    async getAllOrders(req, res){
        try {

            const orders = await OrderService.getAllOrders();
            return res.status(orders.status).send(orders.response);
        } catch (error) {
            return res.status(500).send('Erro interno do servidor');
        }
    }
}

module.exports = new OrderController();