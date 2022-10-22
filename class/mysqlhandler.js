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

exports.mysqlquery = ((query, value, conn) => {

    return new Promise(((resolve, reject) => {

        conn.query(query, value, (err, results, fields) => {

            if (err) {

                reject(false);

            } else {

                resolve({ result: results, field: fields });

            }

        });

    }));

});

// function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }

//     console.log('connected as id ' + connection.threadId);
//   }