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

    },

    buscarClientePorId: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um identificador (ID) válido' })
            }
            const resultado = await clienteModel.selecionarPorID(id);
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
},

    atualizarCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            let {nome_cliente, cpf_cliente} = req.body;

            nome_cliente = nome_cliente.trim();

            if(!idCliente|| !nome_cliente || !cpf_cliente || typeof idCliente!== 'number' || !isNaN(nome_cliente) || isNaN(cpf_cliente) || nome_cliente.trim().lenght < 3) {
                return res.status(400).json({message: 'Verifique os dados enviados e tente novamente'});
            }
            
            const clienteAtual = await clienteModel.selecionarPorID(idCliente);
            if(clienteAtual.length === 0){
                throw new Error('Registro não localizado');
            }
            
            const novoNome = nome_cliente ?? clienteAtual[0].nome_cliente;
            const novoCpf = cpf_cliente ?? clienteAtual[0].cpf_cliente;

            const resultado = await clienteModel.editarCliente(idCliente, novoNome, novoCpf);

            if(resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao atualizar o cliente');
            }

            res.status(200).json({message: 'Registro atualizado com sucesso', data: resultado});

            } catch (error) {
             console.error(error)
            res.status(500).json({
                message: 'Ocorreu um erro no servidor.',
                errorMessage: error.Message
            })
        }
    },

      excluirCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            if(!id || !Number.isInteger(id)){
                return res.status(400).json({message: 'Forneça um ID válido'});
            }

            const produtoSelecionado = await clienteModel.selecionarPorID(id);
            console.log(produtoSelecionado);

            if (produtoSelecionado.length === 0) {
                throw new Error('Registro não localizado');
            } else {
            const resultado = await clienteModel.deleteCliente(id);
            if (resultado.affectedRows === 1) {
                res.status(200).json({message: 'Cliente excluído com sucesso', data: resultado});
            } else {
                throw new Error('Não foi possível excluir o cliente');
                
            }
            }
        } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ocorreu um erro no servidor',
            errorMessage: error. message
        });   
        }
}

}

module.exports = { clienteController }