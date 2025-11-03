const { clienteModel } = require('../models/clienteModel');

const clienteController = {

    buscarTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodos();
            if (resultado.leght === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' })
            }
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor.',
                errorMessage: error.message
            });
        }
    },

    incluirCliente: async (req, res) => {
        try {
            const { nome_cliente, cpf_cliente } = req.body
            if (!String(nome_cliente) || nome_cliente.lenght < 3 || !cpf_cliente) {
                return res.status(400).json({ message: 'Dados inválidos' });
            }

            const cpfIgual = await clienteModel.verificarCpf(cpf_cliente);

            if(cpfIgual.length > 0){
                return res.status(409).json({message: 'CPF já existente, insira novamente'})
            }
            const resultado = await clienteModel.inserirCliente(nome_cliente, cpf_cliente);
            
            if (cpf_cliente != cpfIgual) {
                return res.status(201).json({ message: 'Cliente inserido com sucesso', result: resultado })

            } else {
                return res.status(409).json({ message: 'O cpf inserido já existe.' })

            };
            


        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor.',
                errorMessage: error.message
            })
        }

    }
}

module.exports = { clienteController }