const productService = require('../services/productService');

class ProductController {

    async createProduct(req, res) {
    try {
        const data = req.body
        if (!data.name || !data.price){
           return res.status(400).send('Erro ao cadastrar o produto, por favor confira todos os dados de entrada!') 
        }
        if (isNaN(data.price)){
            return res.status(400).send('Erro ao cadastrar o produto, preço deve ser um número!')
        }
        const register = await productService.createProduct(data)

        return res.status(register.status).send(register.response)
    } catch (error) {
        console.error('Erro ao cadastrar produto', error)
        return res.status(error.status).send(error.response)
    }
        
    }

    async getAllProducts( _, res){
        try {
            const products = await productService.getAllProducts();
            return res.status(products.status).send(products.response);
        } catch (error) {
            console.error('Erro ao obter os produtos', error);
            return res.status(error.status).send(error.response)
        }
       
    }

    async getProduct(req, res){
        const productId = req.params.id;
        const productIdNumber = parseInt(productId)
        if (!Number.isInteger(productIdNumber)){
            return res.status(400).send(`O '${productId}' não faz referencia a um identificador de produto!`)
        }
     
        try {
            const product = await productService.getProductById(productId);
            return res.status(product.status).send(product.response);
        } catch (error) {
            console.error(`Erro ao obter o produto! id:${productId}`, error)
            return res.status(error.status).send(error.response);
        }
    }

    async sofDelete(req, res){
        const productId = req.params.id;
        try {
            const response = await productService.softDeleteById(productId);
            return res.status(response.status).send(response.response);
        } catch (error) {
            console.error(`Erro ao apagar o produto! id:${productId}`, error)
            return res.status(error.status).send(error.response)
        }
    }

    async updateProduct(req, res){
        const data = req.body
        
    try{
        if (!data.name || !data.price || !Number.isInteger(data.product_id)){
            return res.status(400).send('Erro ao atualizar o produto, por favor confira todos os dados de entrada!') 
        }
        if (isNaN(data.price)){
            return res.status(400).send('Erro ao atualizar o produto, preço deve ser um número!')
        }

        const response = await productService.updateProduct(data);
        return res.status(response.status).send(response.response);
    } catch (error) {
        console.error(`Erro ao atualizar o produto! id:${productId}`, error)
        return res.status(error.status).send(error.response)
    }
    }
}


module.exports = new ProductController();
