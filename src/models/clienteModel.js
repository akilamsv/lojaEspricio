const pool = require('../config/db')

const clienteModel = {
    selecionarTodos: async () => {
    const sql = 'SELECT * FROM clientes;';
    const [rows] = await pool.query(sql);
    return rows;
    },

    inserirCliente: async (pNome_cliente, pCpf_cliente) => {
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?)';
        const values = [pNome_cliente, pCpf_cliente];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },

    verificarCpf: async (pCpf_cliente) => {
    const sql = 'SELECT * FROM clientes WHERE cpf_cliente=?;';
    const values = [pCpf_cliente];
    const [rows] = await pool.query(sql, values);
    return rows;
    },

}

module.exports = {clienteModel};