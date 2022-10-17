const mysql = require('mysql2');

mysqlopt = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodechat',
    port: 3306,
    multipleStatements: true
};

exports.mysqlconn = () => {

    return mysql.createConnection(mysqlopt);

};

// function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }

//     console.log('connected as id ' + connection.threadId);
//   }