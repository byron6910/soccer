const mysql = require('mysql');
const {promisify}=require('util');

const pool=mysql.createPool({
  connectionLimit: 10,
  host:'localhost',
  user:'root',
  password:'',
  database:'San_Pablo'
});

pool.getConnection((err,connection)=>{
  if (err) {
    if(err.code=='PROTOCOL_CONNECTION_LOST'){
      console.error('coneccion de la base de datos fue cerrada');
    }
    if (err.code=='ER_CON_COUNT_ERROR') {
      console.error('Base de datos tiene muchas conexiones');
    }
    if (err.code=='ECONNREFUSED') {
      console.error('Base de datos fue rechazada');
    }
  }
  if (connection) {
    connection.release();
  }

  console.log('Base de datos conectada');
  return;
});


pool.query=promisify(pool.query);

module.exports=pool;
