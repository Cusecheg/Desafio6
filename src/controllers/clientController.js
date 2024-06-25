const clientService = require('../services/clientService');
const validator = require('validator');

class ClientController {

    async createClient(req, res) {
        const data = req.body;
        try {
            if (!data.username || !data.email || !data.password) {
                return res.status(400).send('Todos os campos são obrigatorios e não podem estar vazios');
            }
            if (!validator.isEmail(data.email)){
                return res.status(400).send('Por favor inserir um email valido!')
            }

            const register = await clientService.createClient(data)
       
            return res.status(register.status).send(register.response)
   

        } catch (error) {
            console.error('Erro ao cadastrar cliente', error);
            return res.status(500).send('Erro interno do servidor');
        }

    }
}

module.exports = new ClientController();
