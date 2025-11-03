const mysql = require ('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'lojaDB',
    port: 3308,
    waitForConnections: true,     //Aguarda conexões livres
    connectionLimit: 10,         //Limita o numero de conexoes simultaneas
    queueLimit: 0                //Sem limite para a fila de conexoes
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`Conectado ao MySQL`);
        connection.release();
    } catch (error) {
        console.error(`Erro ao conectar ao MySQL: ${error}`);
    }
})();


module.exports = pool;