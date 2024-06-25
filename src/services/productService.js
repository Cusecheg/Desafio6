

const productModel = require('../models/product');

class ProductService {

    async createProduct(data) {
        try {
    
            //HABILITAR PARA RECUPERAÇÃO E ATUALIZAÇÃO DE PRODUTO (PRODUTO )
            // const nameDb = await productModel.getByName(data.name);
    
            // if (nameDb.status === 200 && nameDb.response.length > 0) {
         
            //     const productToUpdate = nameDb.response[0];
    
    
            //     if (!data.name || !data.price) {
            //         return { status: 400, response: 'Erro ao atualizar o produto, por favor confira todos os dados de entrada!' };
            //     }
            //     if (isNaN(data.price)) {
            //         return { status: 400, response: 'Erro ao atualizar o produto, preço deve ser um número!' };
            //     }
    
            //     const body = {
            //         name: data.name,
            //         description: data.description,
            //         price: data.price,
            //         quantity: data.quantity,
            //         product_id: productToUpdate.id
            //     };
    
            //     const updateResult = await productModel.update(body);
    
            //     if (updateResult[0].changedRows === 1) {
            //         return { status: 200, response: `Produto restaurado e atualizado com sucesso id:${productToUpdate.id}` };
            //     } else if (updateResult[0].changedRows === 0) {
            //         return { status: 400, response: `Não foi possível restaurar e atualizar o produto de id:${productToUpdate.id}, confira os campos de entrada novamente!` };
            //     } else {
            //         return { status: 500, response: updateResult };
            //     }
            // } else {
    
                const createResult = await productModel.create(data);
                return { status: createResult.status, response: createResult.response };
            // }
        } catch (error) {
            console.error('Erro interno do servidor', error);
            throw { status: error.status || 500, response: error.response || 'Erro interno do servidor' };
        }
    }

    async getAllProducts() {
        try {
            const result = await productModel.getAll();
            if (result.status === 200) {
                const products = result.response.map( data => {
            return {
                product_id: data.product_id,
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                quantity: data.quantity,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
                
            }})
                return { status: 200, response: products }
        }else {
    
            return { status: result.status, response: result.response };
        }
    } catch (error) {
        console.error(error.response, error.error);
        throw { status: error.status || 500, response: error.response || 'Erro interno do servidor' };
    }
}

    async getProductById(productId){
        try {
            const result = await productModel.getById(productId);
            if (result.length === 0){
                return {status: 400, response: 'Produto não encontrado!'}
            }else{
                const product = result.map(item => {
                    return {
                        product_id: item.product_id,
                        name: item.name,
                        description: item.description,
                        price: parseFloat(item.price),
                        quantity: item.quantity,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
                    }
                })
                return {status: 200, response: product};
            }
        } catch (error) {
            console.error(error.response, error.error);
            throw { status: error.status || 500, response: error.response || 'Erro interno do servidor' };
        }
    }

    async softDeleteById(productId){
        try {
            const result = await productModel.softDeleteById(productId);
            if(result.response.changedRows === 1){
                return {status: 200, response: `O produto de id:${productId} foi apagado com sucesso!`}
            }else{
                return {status: 400, response: 'Produto não encontrado!'};
            }
        } catch (error) {
            console.error(error.response, error.error);
            throw { status: error.status || 500, response: error.response || 'Erro interno do servidor' };
        }
    }
    async updateProduct(data){
        try {
            const result = await productModel.update(data);
         
            if (result[0].changedRows === 1){
                return {status: 200, response: `Produto atualizado com sucesso id:${data.product_id} `}
            }else if(result[0].changedRows === 0){
                return {status: 400, 
                response: `Não foi possivel atualizar o produto de id:${data.product_id}, confira as alterações e tente novamente!`}
            }else{
                return {status: 500, response: result}
            }
        } catch (error) {
            console.error(error.response, error.error);
            throw { status: error.status || 500, response: error.response || 'Erro interno do servidor' };
        }
    }
}



module.exports = new ProductService();