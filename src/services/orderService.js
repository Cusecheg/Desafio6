
const orderModel = require('../models/order');
const productService = require('./productService');

class OrderService {
    async createOrder(data) {
        try {

            const combinedProducts = data.products.reduce((acc, cur) => {
                const existingProduct = acc.find(p => p.product_id === cur.product_id);
                if (existingProduct) {
                    existingProduct.quantity += cur.quantity;
                } else {
                    acc.push({ ...cur });
                }
                return acc;
            }, []);

            const orderProductsIds = combinedProducts.map( product => product.product_id);
            const availableProducts = await productService.getAllProducts();
            const verifyProducts = availableProducts.response.filter( product => orderProductsIds.includes(product.product_id));

            if (verifyProducts.length !== orderProductsIds.length){
                return { status: 400, response: 'Alguns produtos no pedido estão inativos ou não existem!'};
            }

            for (const product of combinedProducts){
                const availableProducts = verifyProducts.find( p => p.product_id === product.product_id)
                if (availableProducts.quantity < product.quantity){
                    return { status: 400, response: `Estoque insuficiente para o produto '${availableProducts.name}' de ID:${availableProducts.product_id}`}
                }
            }
            
            const result = await orderModel.createOrder(data);

            const orderSummary = result.response.map(order => ({
                product: order.product,
                quantity: order.quantity,
                unitary_price: parseFloat(parseFloat(order.price).toFixed(2)),
                sub_total: parseFloat((order.price * order.quantity).toFixed(2))
            }));

            const total = parseFloat(orderSummary.reduce((acc, cur) => acc + parseFloat(cur.unitary_price) * cur.quantity, 0).toFixed(2));

            const formattedResponse = {
                client_id: data.client_id,
                username: result.response[0].client,
                order_number: result.order_number,
                order_date: result.response[0].date_order,
                order_summary: orderSummary,
                total
            };

            return { status: 200, response: formattedResponse };
        } catch (error) {
            console.error('Erro ao criar pedido', error);
            return { status: 500, response: 'Erro interno do servidor', error };
        }
    }
    async getAllOrders(){
        try {
            const orders = await orderModel.getOrders();
            if (orders.status === 200){
                const groupedOrders = orders.response.reduce((acc, order) => {
                    const { order_number, product, quantity, unitary_price } = order;
                    
                    if (!acc[order_number]) {
                        acc[order_number] = {
                            client_id: order.client_id, 
                            username: order.username, 
                            order_number: order.order_number, 
                            order_date: order.order_date,
                            order_summary: [],
                            total: 0
                        };
                    }
                    const sub_total = parseFloat((unitary_price * quantity).toFixed(2));
                    acc[order_number].order_summary.push({ 
                        product, 
                        quantity, 
                        unitary_price: parseFloat(parseFloat(unitary_price).toFixed(2)),
                        sub_total
                      });
                    
                    acc[order_number].total += sub_total;

                     
                
                    return acc;
                }, {});
                
                const result = Object.values(groupedOrders);
                
                return {status: 200, response: {result, order_totals: result.length}}
            }else{
                return {status: 400, response: orders.response}
            }
    
        } catch (error) {
            return {status: 500, response: 'Erro ao obter os produtos', error}
        }
    }
}

module.exports = new OrderService();