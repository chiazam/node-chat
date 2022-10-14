const mysql = require('mysql2');

mysqlopt={
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodechat',
    port:3306,
    multipleStatements: true
};

exports.mysqlconn = ()=>{

    let mysqlConn = mysql.createConnection(mysqlopt);

    return mysqlConn;

};