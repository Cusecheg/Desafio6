async createProduct(data) {
    try {

        //HABILITAR O DE RECUPERAÇÃO E ATUALIZAÇÃO DE PRODUTO (PRODUTO )
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
        throw { status: 500, response: 'Erro interno do servidor', error };
    }
}