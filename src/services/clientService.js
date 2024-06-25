
const clientModel = require('../models/client');

class ClientService {
    async createClient(data) {

        try {
            const verifyEmailExist = await clientModel.getClient(data.email);

            if (verifyEmailExist.status === 200 && verifyEmailExist.response) {
                return { status: 400, response: 'O email já existe!' };
            }

            const result = await clientModel.create(data);
            
            if (result.status === 200){
                return {status: 200, response: `Usuario cadastrado com sucesso id:${result.response}`}
            }else{
                return {status: 400, response: result.response};
            }

        } catch (error) {
            return { status: 500, response: 'Erro interno do servidor', error };
        }
        
    }
}

module.exports = new ClientService();